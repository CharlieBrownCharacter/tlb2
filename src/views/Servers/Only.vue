<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <section>
    <v-container v-if="server !== null" grid-list-md>
      <h1 class="font-weight-medium">{{ server.name }}</h1>
      Estado: {{ server.status }} <br>
      Última vez alterado: {{ $moment(server.updated).format('DD/MM/YYYY HH:mm') }} <br>
      Criado: {{ $moment(server.created).format('DD/MM/YYYY HH:mm') }} <br>
      Metadata
      <pre class="elevation-2">
        {{ server.metadata }}
      </pre>
      <v-layout row class="mt-4">
        <v-flex xs12 md6>
          <h4 class="font-weight-thin">Endereços Partilhados</h4>
          <v-data-table
              hide-actions
              :headers="ADDRESS_HEADERS"
              :items="server.addresses.shared"
              class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item['OS-EXT-IPS-MAC:mac_addr'] }}</td>
              <td>{{ props.item.version }}</td>
              <td>{{ props.item.addr }}</td>
              <td>{{ props.item['OS-EXT-IPS:type'] }}</td>
            </template>
          </v-data-table>
          <h4 class="font-weight-thin mt-2">Flavor</h4>
          <v-card>
            <v-card-text v-for="(value, key) in flavor">
              <template v-if="!Array.isArray(value)">
                {{ key }}: {{ value }}
              </template>

            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <h4 class="font-weight-thin">Grupos Segurança</h4>
          <v-card>
            <v-card-text v-for="security_group in server.security_groups" :key="security_group.name + '_sg'">
              {{ security_group.name }}
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
  import SERVERS from "../../packages/API/servers"
	import {mapGetters} from "vuex"
	import FLAVOURS from "../../packages/API/flavors"

	export default {
  	data(){
  		return {
				server: null,
        flavor: null,
        timer: null,
        ADDRESS_HEADERS: [
					{ text: 'MAC', value: 'OS-EXT-IPS-MAC:mac_addr' },
					{ text: 'Versão', value: 'version' },
					{ text: 'Endereço', value: 'addr' },
					{ text: 'Tipo', value: 'OS-EXT-IPS:type' },
        ]
      }
    },
  	methods: {
			GET_SERVERS_DETAILS(){
				if(this.GET_TOKEN === null){
					this.$toasted.error('Deve inserir a token antes de realizar o pedido')
          return
        }

				SERVERS.GET_SERVER(this.$route.params.id).then(r => {
          this.server = r.data.server

          FLAVOURS.GET_FLAVOR(this.server.flavor.id).then(r => {
						this.flavor = r.data.flavor
					})
				})
      },
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
  		this.timer = setInterval(this.GET_SERVERS_DETAILS, 4000)
		}
	}
</script>
