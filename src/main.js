import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import 'materialize-css/dist/js/materialize.min'
import 'dateformat/lib/dateformat.js'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$axios.defaults.headers.common['Authorization'] = 'Token ' + token
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
