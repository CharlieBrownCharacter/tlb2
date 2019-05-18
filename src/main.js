import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import {store} from './store'
import Toasted from 'vue-toasted';



axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers['Accept'] = "application/json";
axios.defaults.headers['Content-Type'] = "application/json";

Vue.config.productionTip = false

Vue.use(Toasted, {
  duration: 4000
})
Vue.use(require('vue-moment'));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
