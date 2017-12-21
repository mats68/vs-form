// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import VsForm from 'src/components/vs-form'
import VsItem from 'src/components/vs-item'

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.component('vs-form', VsForm)
Vue.component('vs-item', VsItem)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
