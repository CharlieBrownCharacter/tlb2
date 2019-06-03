<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>LTI STACK</span>
        <v-spacer></v-spacer>
      </v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" app fixed>
      <v-list two-line>
        <v-list-tile :to="{name: 'home'}">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <template v-if="GET_TOKEN !== null">
        <v-list-tile :to="{name: 'servers'}">
          <v-list-tile-action>
            <v-icon>computer</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Servers</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{name: 'flavors'}">
          <v-list-tile-action>
            <v-icon>fastfood</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Flavors</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{name: 'images'}">
          <v-list-tile-action>
            <v-icon>portrait</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Images</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{name: 'volumes'}">
          <v-list-tile-action>
            <v-icon>view_agenda</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Volumes</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container grid-list-md>
        <v-layout row>
          <v-flex xs10>
            <v-text-field
                solo
                v-model="token"
                label="Token"
            ></v-text-field>
          </v-flex>
          <v-flex xs2>
            <v-btn
              block
              @click="SET_TOKEN_METHOD(token)"
              style="height: 47px; margin-top: 0px"
            >
              SET TOKEN
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
	import {mapGetters, mapMutations} from "vuex"

  export default {
    name: 'App',
    data () {
      return {
        drawer: true,
        token: ''
      }
    },
    computed: {
      ...mapGetters({
        GET_TOKEN: 'GET_TOKEN'
      })
    },
    methods: {
      ...mapMutations({
				SET_TOKEN: 'SET_TOKEN'
      }),
			SET_TOKEN_METHOD(){
        this.SET_TOKEN(this.token);
				this.$toasted.show('Adicionada com sucesso')
      }
    },
    created(){}
  }
</script>

<style>
  pre {
    background-color: white;
    color: black;
    display: block;
    border-radius: 10px;
  }
</style>
