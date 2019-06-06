<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <section>
    <v-container grid-list-md>
      <v-layout row align-center justify-space-around fill-height>
        <v-flex>
          <v-btn
              block
              dark
              @click="ADD_MODAL_PRE_MADE_SERVER('web')"
          >
            LANÇAR WEB
          </v-btn>
        </v-flex>
        <v-flex>
          <v-btn
              block
              dark
              @click="ADD_MODAL_PRE_MADE_SERVER('dns')"
          >
            LANÇAR DNS
          </v-btn>
        </v-flex>
      </v-layout>
      <v-data-table
          hide-actions
          :headers="headers"
          :items="servers"
          :loading="loaders.action"
          class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td>
            {{ props.item.status }}
          </td>
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
                <v-list-tile @click="$router.push({name: 'servers-only', params: {id: props.item.id}})">
                  <v-list-tile-title>Mais detalhes</v-list-tile-title>
                </v-list-tile>
              </v-list>
              <v-list>
                <v-list-tile @click="DELETE_SERVER(props.item.id)">
                  <v-list-tile-title>Apagar Servidor</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </td>
        </template>
      </v-data-table>
    </v-container>

    <!-- criar nova instancia dialog -->
    <div class="text-xs-center">
      <v-dialog
          v-model="dialogs.create"
          width="900"
      >
        <v-card>
          <v-card-title
              primary-title
          >
            <h2 class="font-weight-thin text-uppercase">adicionar servidor</h2>
          </v-card-title>
          <hr>

          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
                label="Nome"
                placeholder="Nome"
                v-model="newServer.server.name"
                solo
            ></v-text-field>
            <v-layout row>
              <v-flex grow>
                <v-select
                    solo
                    :items="networks"
                    v-model="newServer.server.networks"
                    :disabled="newServer.server.auto"
                    multiple
                    item-text="name"
                    item-value="id"
                    label="Network"
                ></v-select>
              </v-flex>
              <v-flex shrink>
<!--                <v-checkbox v-model="newServer.server.auto" label="Auto"></v-checkbox>-->
              </v-flex>

            </v-layout>
            <v-select
                solo
                :items="flavors"
                v-model="newServer.server.flavorRef"
                item-text="name"
                item-value="id"
                label="Flavor"
            ></v-select>
            <v-select
                solo
                :items="images"
                v-model="newServer.server.imageRef"
                item-text="name"
                item-value="id"
                label="Image"
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                :loading="loaders.newServer"
                dark
                @click="ADD_SERVER"
            >
              Adicionar Servidor
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!-- criar instancia pre made dialog -->
    <div class="text-xs-center">
      <v-dialog
          v-model="dialogs.createPreMade"
          width="900"
      >
        <v-card>
          <v-card-title
              primary-title
          >
            <h2 class="font-weight-thin text-uppercase">lançar instancia {{ activePreMade.name }}</h2>
          </v-card-title>
          <hr>

          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
                label="Nome"
                placeholder="Nome"
                v-model="activePreMade.server.name"
                solo
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              dark
              :loading="loaders.newServer"
              @click="ADD_PRE_MADE_SERVER"
            >
              LANÇAR INSTANCIA DE SERVIDOR {{ activePreMade.name }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-btn
      fab
      fixed
      bottom
      right
      dark
      @click="dialogs.create = true"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </section>
</template>

<script>
  import SERVERS from "../../packages/API/servers"
	import {mapGetters} from "vuex"
	import NETWORKS from "../../packages/API/networks"
	import FLAVORS from "../../packages/API/flavors"
	import IMAGES from "../../packages/API/images"

	export default {
  	data(){
  		return {
				headers: [
					{ text: 'Nome', sortable: true, value: 'name' },
					{ text: 'Estado', value: 'status' },
					{ text: 'Data criação', value: 'created' },
					{ text: '', value: '' },
				],
				servers: [],
        timer: null,
        loaders: {
					action: false,
					newServer: false,
        },
        dialogs: {
					create: false,
					createPreMade: false
        },
        networks: [],
        flavors: [],
        images: [],
        newServer: {
					server: {
						name: '',
						networks: [],
						flavorRef: '',
						imageRef: '',
            auto: false
          },
          name: ''
        },
        activePreMade: {
					server: {
						name: '',
						networks: [{uuid: ''}],
						flavorRef: 5,
						imageRef: '',
					}
        }
      }
    },
  	methods: {
			GET_SERVERS_DETAILS(){
				if(this.GET_TOKEN === null){
					this.$toasted.error('Deve inserir a token antes de realizar o pedido')
          return
        }

				this.loaders.action = true;

				SERVERS.GET_SERVERS_DETAILS().then(r => {
					this.servers = r.data.servers;
				}).finally(() => {
					this.loaders.action = false;
				})
      },
			DELETE_SERVER(SERVER_ID){
				if(!confirm('Tem a certeza que gostaria de apagar este server?')) return

				this.loaders.action = true;
				SERVERS.DELETE_SERVER(SERVER_ID).then(r => {

        }).finally(() => {
        	this.loaders.action = false;
        })
      },
      ADD_SERVER(){
        let server = JSON.parse(JSON.stringify(this.newServer.server))
        // if(server.auto){
        // 	server.networks = [{"uuid": "auto"}]
        // }else{
        let networks = []
        server.networks.forEach(n => {
          networks.push({
            "uuid": n
          })
        })
        server.networks = networks
        // }

        delete server.auto

        this.loaders.newServer = true;

				SERVERS.ADD_SERVER({server: server}).then(r => {
					this.$toasted.show('Server adicionado com sucesso')
          this.dialogs.create = false;
					this.GET_SERVERS_DETAILS()
				}).finally(() => {
					this.loaders.newServer = false;
				})
			},
      ADD_PRE_MADE_SERVER(){
				this.loaders.newServer = true;
				SERVERS.ADD_SERVER({server: this.activePreMade.server}).then(r => {
					this.$toasted.show('Server adicionado com sucesso')
					this.dialogs.createPreMade = false;
					this.GET_SERVERS_DETAILS()
				}).finally(() => {
					this.loaders.newServer = false;
				})
      },
			ADD_MODAL_PRE_MADE_SERVER(PRE_MADE){
				this.activePreMade.name = PRE_MADE
				this.dialogs.createPreMade = true;
        if(PRE_MADE === 'web'){
          this.activePreMade.server = {
            name: '',
            networks: [{uuid: '2adad4a8-9f4b-4e67-ab7b-cf76754ef6d0'}],
            flavorRef: 5,
            imageRef: '0acc8038-bd77-49be-8c47-33e7945b1940',
          }
        }

        if(PRE_MADE === 'dns'){
					this.activePreMade.server = {
						name: '',
						networks: [{uuid: '2adad4a8-9f4b-4e67-ab7b-cf76754ef6d0'}],
						flavorRef: 2,
						imageRef: '0acc8038-bd77-49be-8c47-33e7945b1940',
					}
        }
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
			this.GET_SERVERS_DETAILS()
			// this.timer = setInterval(this.GET_SERVERS_DETAILS, 4000)
      NETWORKS.GET_NETWORKS().then(r => {
        this.networks = r.data.networks
      })

      FLAVORS.GET_FLAVORS().then(r => {
				this.flavors = r.data.flavors
			})

      IMAGES.GET_IMAGES().then(r => {
				this.images = r.data.images
			})
  	}
	}
</script>
