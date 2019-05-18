<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <section>
    <v-container grid-list-md>

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
