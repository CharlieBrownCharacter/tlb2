<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <section>
    <v-container>
      <v-data-table
          hide-actions
          :headers="headers"
          :items="flavors"
          :loading="loaders.table"
          class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.name }}</td>
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
                <v-list-tile @click="DELETE_FLAVOUR(props.item.id)">
                  <v-list-tile-title>DELETAR</v-list-tile-title>
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
        @click="dialogs.createFlavor = true"
      >
        <v-icon>add</v-icon>
      </v-btn>

      <v-dialog
          v-model="dialogs.createFlavor"
          width="1200"
      >
        <v-card>
          <v-layout row>
            <v-flex xs12 md6>
              <v-card-text>
                <v-text-field
                    label="Nome"
                    solo
                    v-model="flavor.name"
                ></v-text-field>
                <v-text-field
                    label="ID (opcional)"
                    solo
                    v-model="flavor.id"
                ></v-text-field>
                <v-slider
                    v-model="flavor.ram"
                    :max="8000"
                    thumb-label
                ></v-slider>
                <v-slider
                    v-model="flavor.vcpus"
                    :max="10"
                    thumb-label
                ></v-slider>
                <v-slider
                    v-model="flavor.disk"
                    :max="1000"
                    thumb-label
                ></v-slider>
              </v-card-text>
            </v-flex>
            <v-flex md6>
              <h2 class="mt-3">Nome: {{ flavor.name }}</h2>
              <h2>ID: {{ flavor.id }}</h2>
              <h2>RAM: {{ flavor.ram }} MB</h2>
              <h2>VCPUS: {{ flavor.vcpus }}</h2>
              <h2>Tamanho Disco: {{ flavor.disk }} GB</h2>
              <v-btn @click="POST_FLAVOR" :loading="loaders.adding">
                ADICIONAR
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-dialog>
    </v-container>
  </section>
</template>

<script>
	import {mapGetters} from "vuex"
	import FLAVORS from "../../packages/API/flavors"

	export default {
  	data(){
  		return {
  			flavor: {
          name: '',
					id: null,
          ram: 0,
          vcpus: 0,
          disk: 0,
        },
				headers: [
					{ text: 'ID', value: 'id' },
					{ text: 'Nome', value: 'name' },
					{ text: '', value: '' },
				],
				flavors: [],
        loaders: {
					table: false,
          adding: false
        },
        dialogs: {
					createFlavor: true
        },
      }
    },
  	methods: {
			GET_FLAVOURS(){
				this.loaders.table = true;
				FLAVORS.GET_FLAVORS().then(r => {
					this.flavors = r.data.flavors
				}).finally(() => {
					this.loaders.table = false;
				})
      },
      DELETE_FLAVOUR(FLAVOUR_ID){
				if(!confirm('Tem a certeza que deseja apagar este flavor?')){
					return;
        }

				this.loaders.table = true;

				FLAVORS.DELETE_FLAVOR(FLAVOUR_ID).then(r => {
          this.$toasted.show('Flavour foi deletado com sucesso')

          this.GET_FLAVOURS()
				}).catch(err => {
					alert('Houve um erro ao deletar este flavour: ' + err.response.data)
        }).finally(() => {
					this.loaders.table = false;
				})
      },
			POST_FLAVOR(){
				this.loaders.adding = true;

				FLAVORS.POST_FLAVOR(this.flavor).then(r => {
					this.dialogs.createFlavor = false;
					this.$toasted.show('Flavor criado com sucesso')
          this.GET_FLAVOURS()
				}).catch(err => {
				  alert("Erro ao criar flavor " + JSON.stringify(err.response.data))
        }).finally(() => {
					this.loaders.adding = false;
        })
      }
    },
    computed: {
			...mapGetters({
				GET_TOKEN: 'GET_TOKEN'
			})
    },
    created() {
			this.GET_FLAVOURS()
		}
	}
</script>

<style>
  .md6 > h2 {
    font-weight: 100;
  }
</style>
