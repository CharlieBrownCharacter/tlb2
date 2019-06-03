<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <section>
    <v-container>
      <v-data-table
          hide-actions
          :headers="headers"
          :items="volumes"
          :loading="loaders.action"
          class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.size }} Gb</td>
          <td>{{ props.item.volume_type }}</td>
          <td>{{ props.item.bootable }}</td>
          <td>{{ props.item.status }}</td>
          <td>{{ $moment(props.item.created_at).format('D/M/YYYY HH:mm') }}</td>
          <td>{{ $moment(props.item.updated_at).format('D/M/YYYY HH:mm') }}</td>
          <td>
            <v-menu bottom left>
              <template v-slot:activator="{ on }">
                <v-btn
                    icon
                    fab
                    v-on="on"
                >
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </template>
              </v-list>
                <v-list-tile @click="DELETE_VOLUME(props.item.id)">
                  <v-list-tile-title>Apagar Volume</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </td>
        </template>
      </v-data-table>
      <v-btn
        fab
        fixed
        bottom
        right
        dark
        color="black"
        @click="dialogs.newVolume = true"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-container>

    <v-dialog v-model="dialogs.newVolume" width="600">
      <v-card>
        <v-card-text row wrap>
          <v-form ref="form" v-model="valid">
            <v-card-text>  
              <v-text-field
                label="Nome"
                :rules="nameRules"
                solo
                v-model="volume.name"
              ></v-text-field>
              <v-slider
                v-model="volume.size"
                always-dirty
                :min="1"
                :max="50"
                label="Tamanho"
                thumb-label
              ></v-slider>
              <v-combobox
                v-model="agregado"
                :items="agregadosVolumes"
                label="Volume vazio ou baseado num volume ou imagem ?"                
              ></v-combobox>
              <v-select
                v-model="imagemVolume"
                v-if="agregado=='baseado numa imagem'"
                :items="images"
                item-text="name"
                item-value="id"
                label="Selecione a imagem a copiar para o seu volume novo"                
              ></v-select>
              <v-select
                v-model="volumeVolume"
                v-if="agregado=='baseado num volume'"
                :items="volumes"
                item-text="name"
                item-value="id"
                label="Selecione o volume a copiar para o seu volume novo"
              ></v-select>
            </v-card-text>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            :disabled="!valid"
            :loading="loaders.adding" 
            @click="POST_VOLUME">ADICIONAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
  import VOLUMES from "../../packages/API/volumes"
  import IMAGES from "../../packages/API/images"
	import {mapGetters} from "vuex"
  import axios from "axios"

	export default {
    data(){
      return {
				headers: [
					{ text: 'Nome', sortable: true, value: 'name' },
					{ text: 'Tamanho', sortable: true, value: 'size' },
          { text: 'Tipo', sortable: true, value: 'volume_type' },
          { text: 'Bootable', value: 'bootable' },
          { text: 'Status', value: 'status' },
					{ text: 'Data criação', value: 'created_at' },
          { text: 'Data modificação', value: 'updated_at' },
				],
        valid: false,
        nameRules: [
          v => !!v || 'Tem que introduzir o nome do volume',
          v => /^[-A-Za-záàâãéèêíóôõúçÁÀÂÃÉÈÍÓÔÕÚÇ 1-9]{3,}$/.test(v) || 'Nome invalido'
        ],
        imagemRules: [
          v => !!v || 'Tem que seleccionar uma imagem',
        ],
        volumeRules: [
          v => !!v || 'Tem que seleccionar um volume'
        ],
        agregado: 'vazio',
        agregadosVolumes:[
          'vazio',
          'baseado numa imagem',
          'baseado num volume'
        ],
        imagemVolume: {},
        volumeVolume: {},
        project_id: null,
        images: [],
        volumes: [],
        volume: {
          name: "",
        },
        timer: null,
        dialogs: {
          newVolume: false
        },
        loaders: {
					action: false
        }
      }
    },
    watch: {
      
    },
    methods: {
			GET_VOLUMES(){
        if(this.GET_TOKEN === null){
          this.$toasted.error('Deve inserir a token antes de realizar o pedido')
          return
        }

        axios({
          method: 'GET',
          url: 'identity/v3/projects',
          }).then(r => {
            let projeto = r.data.projects.find(m => m.name === 'alt_demo');
            this.project_id = projeto.id;
            this.loaders.action = true;
            VOLUMES.GET_VOLUMES(this.project_id).then(r => {
              this.volumes = r.data.volumes;
              IMAGES.GET_IMAGES().then(r => {
                this.images = r.data.images;
              })
            }).finally(() => {
              this.loaders.action = false;
            })
          })
      },
      POST_VOLUME(){
        this.loaders.adding = true;
        if (this.agregado=='baseado numa imagem') this.volume.imageRef=this.imagemVolume;
        if (this.agregado=='baseado num volume') this.volume.source_volid=this.volumeVolume;
        let newVolume = { volume : this.volume };
        console.log(newVolume);

        VOLUMES.POST_VOLUME(this.project_id, newVolume).then(r => {
          this.dialogs.newVolume = false;
          this.$toasted.show('Volume criado com sucesso')
          this.GET_VOLUMES()
        }).catch(err => {
          alert("Erro ao criar volume " + JSON.stringify(err.response.data))
        }).finally(() => {
          this.loaders.adding = false;
        })

      },
			DELETE_VOLUME(VOLUME_ID){
				if(!confirm('Tem a certeza que gostaria de apagar esta imagem?')) return

				this.loaders.action = true;
				VOLUMES.DELETE_VOLUME(this.project_id, VOLUME_ID).then(r => {
        }).finally(() => {
          this.loaders.action = false;
          this.GET_VOLUMES();
        })
      }  
    },
    computed: {
			...mapGetters({
				GET_TOKEN: 'GET_TOKEN',
			})
    },
    destroyed(){
      clearInterval(this.timer)
    },
    created() {
      this.GET_VOLUMES();
			// this.timer = setInterval(this.GET_SERVERS_DETAILS, 4000)
    }
	}
</script>
