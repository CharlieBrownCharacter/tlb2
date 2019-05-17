import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import {store} from './store'
import Toasted from 'vue-toasted';


axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers.common['Content-Type'] = "text/plain";
axios.defaults.headers.common['Accept'] = "text/plain";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = "true";
axios.defaults.headers.common['Access-Control-Allow-Headers'] = "application/json";

Vue.config.productionTip = false

Vue.use(Toasted, {
  duration: 4000
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
