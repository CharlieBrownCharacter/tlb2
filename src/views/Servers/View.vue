<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <section>
    <v-container>
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
  </section>
</template>

<script>
  import SERVERS from "../../packages/API/servers"
	import {mapGetters} from "vuex"

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
					action: false
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

  	}
	}
</script>
