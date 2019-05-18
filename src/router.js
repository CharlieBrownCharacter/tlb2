import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Servers from './views/Servers/View'
import Server from './views/Servers/Only'
import Flavors from './views/Flavors/View'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/servers',
      name: 'servers',
      component: Servers
    },
    {
      path: '/servers/:id',
      name: 'servers-only',
      component: Server
    },
    {
      path: '/flavors',
      name: 'flavors',
      component: Flavors
    }
  ]
})
