import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' 

Vue.use(Vuetify)

Vue.config.productionTip = false

const vuetify = new Vuetify({})

// This is the main entry point for the Vue application
new Vue({
  vuetify, 
  render: h => h(App),
}).$mount('#app')