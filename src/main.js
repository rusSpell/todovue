import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import DatePicker from 'vue2-datepicker';
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
  axios,
  DatePicker,
  render: h => h(App)
}).$mount('#app')
