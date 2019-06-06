<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <section>
    <v-container>
      <v-data-table
          hide-actions
          :headers="headers"
          :items="networks"
          :loading="loaders.action"
          class="elevation-1"
          v-if="networks.length >   0"
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td>{{ getSubnets(props.item.subnets) }}</td>       
          <td>{{ props.item.status }}</td>       
          <td>{{ props.item.shared }}</td>          
          <td>{{ props.item["router:external"] }}</td>       
          <td>{{ props.item.admin_state_up }}</td>       

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
                <v-list-tile @click="DELETE_NETWORK(props.item.id)">
                  <v-list-tile-title>Apagar Network</v-list-tile-title>
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
        @click="dialogs.newNetwork = true"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-container>

    <v-dialog v-model="dialogs.newNetwork" width="600">
      <v-card>
        <v-card-text row wrap>
          <v-form ref="form" v-model="valid">
            <v-card-text>  
              <v-text-field
                label="Nome"
                :rules="nameRules"
                solo
                v-model=" network.name"
              ></v-text-field>
            </v-card-text>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            :disabled="!valid"
            :loading="loaders.adding" 
            @click="POST_NETWORK">ADICIONAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
  import NETWORKS from "../../packages/API/networks"
	import {mapGetters} from "vuex"

	export default {
    data(){
      return {
				headers: [
          { text: 'Nome', sortable: true, value: 'name' },
          { text: 'Subnets', sortable: true, value: 'subnets' },
          { text: 'Status', sortable: true, value: 'status' },
          { text: 'Shared', sortable: true, value: 'shared' },
          { text: 'External', sortable: true, value: 'router:external' },
          { text: 'Admin', sortable: true, value: 'admin_state_up' },
				],
        valid: false,
        nameRules: [
          v => !!v || 'Tem que introduzir o nome da network',
          v => /^[-A-Za-záàâãéèêíóôõúçÁÀÂÃÉÈÍÓÔÕÚÇ 1-9]{3,}$/.test(v) || 'Nome invalido'
        ],        
        networks: [],
        subnets: [],
        network: {
          name: "",
        },
        timer: null,
        dialogs: {
          newNetwork: false
        },
        loaders: {
					action: false
        }
      }
    },
    watch: {
      
    },
    methods: {
			GET_NETWORKS(){
        if(this.GET_TOKEN === null){
          this.$toasted.error('Deve inserir a token antes de realizar o pedido')
          return
        }
        this.loaders.action = true;
        NETWORKS.GET_NETWORKS().then(r => {
          this.networks = r.data.networks;
          NETWORKS.GET_SUBNETS().then(s => {
            this.subnets = s.data.subnetpools;
          })
        }).finally(() => {
          this.loaders.action = false;
        })
      },
      POST_NETWORK(){
        NETWORKS.POST_NETWORK(this.network).then(r => {
          this.dialogs.newVolume = false;
          this.$toasted.show('Network criada com sucesso')
          this.GET_NETWORKS()
        }). catch(err => {
          alert("Erro ao criar network " + JSON.stringify(err.response.data))
        }).finally(() => {
          this.loaders.adding = false;
        })

      },
			DELETE_NETWORK(NETWORK_ID){
				if(!confirm('Tem a certeza que gostaria de apagar esta imagem?')) return

				this.loaders.action = true;
				NETWORKS.DELETE_NETWORK(NETWORK_ID).then(r => {
        }).finally(() => {
          this.loaders.action = false;
          this.GET_VOLUMES();
        })
      },
      getSubnets(SUBNETS_IDS){

        if ( SUBNETS_IDS.length < 1 || this.subnets.length < 1 ) return;

        let nomeSubnets = [];

        SUBNETS_IDS.forEach(id=> {
          let registo = this.subnets.find(s => s.id === id);
          console.log(id);
          console.log(this.subnets);
          //nomeSubnets.push(s.name);
        })

        console.log(nomeSubnets);

        return nomeSubnets.join(",");
      },
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
      this.GET_NETWORKS();
			// this.timer = setInterval(this.GET_SERVERS_DETAILS, 4000)
    }
	}
</script>
