<template>
  <section>
    <v-container>
      <!-- TODO fazer a tabela com os servidores -->
      <v-btn
          block
          @click="GET_SERVERS"
      >
        BUSCAR SERVIDORES
      </v-btn>
    </v-container>
  </section>
</template>

<script>
  import SERVERS from "../../packages/API/servers"

	export default {
  	methods: {
  	  GET_SERVERS(){
				SERVERS.GET_SERVERS().then(r => {
					console.log(r)
				})
      }
    },
    created() {

		}
	}
</script>
