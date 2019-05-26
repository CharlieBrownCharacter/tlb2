<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <section>
    <v-container>
      <v-data-table
          hide-actions
          :headers="headers"
          :items="images"
          :loading="loaders.action"
          class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.status }}</td>
          <td>{{ props.item.container_format }}</td>
          <td>{{ props.item.disk_format }}</td>
          <td>{{ props.item.size }}</td>
          <td>{{ $moment(props.item.created).format('D/M/YYYY HH:mm') }}</td>
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
              <v-list>
                <v-list-tile @click="DELETE_IMAGE(props.item.id)">
                  <v-list-tile-title>Apagar Imagem</v-list-tile-title>
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
        @click="$refs.inputUpload.click()"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <input v-show="false" ref="inputUpload" type="file" @change="NEW_IMAGE" >
    </v-container>

    <v-dialog v-model="dialogs.newImage" width="600">
      <v-card>
        <v-card-text row wrap>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-text>  
              <v-text-field
                  label="Nome"
                  required
                  :rules="nameRules"
                  solo
                  v-model="image.name"
              ></v-text-field>
              <v-combobox
                v-model="image.container_format"
                :items="containerFormat"
                label="Seleccone o formato do container"                
              ></v-combobox>
              <v-combobox
                v-model="image.disk_format"
                :items="diskFormat"
                label="Seleccone o formato da imagem"                
              ></v-combobox>
            </v-card-text>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :loading="loaders.adding" @click="POST_IMAGE">ADICIONAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
  import IMAGES from "../../packages/API/images"
	import {mapGetters} from "vuex"

	export default {
  	data(){
  		return {
				headers: [
					{ text: 'Nome', sortable: true, value: 'name' },
					{ text: 'Estado', value: 'status' },
          { text: 'Container', value: 'disk_format' },
          { text: 'Formato', value: 'disk_format' },
          { text: 'Tamanho', value: 'size' },
					{ text: 'Data criação', value: 'created' },
					{ text: '', value: '' },
				],
        image: {
          'name': '',
          'container_format': 'bare',
          'disk_format': 'qcow2',
          'visibility': 'public',
        },
        containerFormat:[
          'ami',
          'ari',
          'aki',
          'bare',
          'ovf',
          'ova',
          'docker'
        ],
        diskFormat:[
          'ami',
          'ari',
          'aki',
          'vhd',
          'vmdk',
          'raw',
          'qcow2',
          'vdi',
          'ploop',
          'iso'
        ],
        valid: true,
        nameRules: [
          v => !!v || 'Tem que introduzir o nome da imagem',
          v => /^[-A-Za-záàâãéèêíóôõúçÁÀÂÃÉÈÍÓÔÕÚÇ 1-9]{3,}$/.test(v) || 'Nome invalido'
        ],
				images: [],
        file: '',
        timer: null,
        dialogs: {
          newImage: false
        },
        loaders: {
					action: false
        }
      }
    },
  	methods: {
			GET_IMAGES(){
				if(this.GET_TOKEN === null){
					this.$toasted.error('Deve inserir a token antes de realizar o pedido')
          return
        }
				this.loaders.action = true;
				IMAGES.GET_IMAGES().then(r => {
					this.images = r.data.images;
				}).finally(() => {
					this.loaders.action = false;
				})
      },
      NEW_IMAGE(){
        this.file = this.$refs.inputUpload.files[0];
        if(this.GET_TOKEN === null){
          this.$toasted.error('Deve inserir a token antes de realizar o pedido')
          return
        }
        this.dialogs.newImage=true;
      },
      POST_IMAGE(){
        if (this.$refs.form.validate()) {
          this.dialogs.newImage=false;
          this.loaders.action = true;

          console.log(this.image);
          IMAGES.POST_IMAGE(this.image).then(r => {

            IMAGES.PUT_IMAGE(r.data.id, this.file);
            
          }).finally(() => {
            this.loaders.action = false;
            this.GET_IMAGES(); 
          })
        }
      },
			DELETE_IMAGE(IMAGE_ID){
				if(!confirm('Tem a certeza que gostaria de apagar esta imagem?')) return

				this.loaders.action = true;
				IMAGES.DELETE_IMAGE(IMAGE_ID).then(r => {
        }).finally(() => {
        	this.loaders.action = false;
          this.GET_IMAGES();
        })
      }
    },
    computed: {
			...mapGetters({
				GET_TOKEN: 'GET_TOKEN'
			})
    },
    destroyed(){
  	  clearInterval(this.timer)
    },
    created() {
			this.GET_IMAGES()
			// this.timer = setInterval(this.GET_SERVERS_DETAILS, 4000)

  	}
	}
</script>
