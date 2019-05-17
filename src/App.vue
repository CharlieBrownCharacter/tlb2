<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>LTI STACK</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" app fixed>
      <v-list two-line>
        <template v-if="localStorage.getItem('user') === null">
          <v-list-tile @click="login">
            <v-list-tile-content class="text-xs-center">
              LET ME IN
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <template v-else>
          <v-list-tile @click="logout">
            <v-list-tile-content class="text-xs-center">
              Logout
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <v-list-tile :to="{name: 'servers'}">
          <v-list-tile-action>
            <v-icon>computer</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Servers</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  import AuthAPI from './packages/API/auth'

  export default {
    name: 'App',
    data () {
      return {
        drawer: true
      }
    },
    methods: {
      login(){
        AuthAPI.letmein().then(r => {
					localStorage.setItem('user', JSON.stringify(r.data))
				});
      },
      logout(){
				localStorage.setItem('user', null)
      }
    },
    created(){
		}
  }
</script>
