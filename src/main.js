// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import vsForm from 'src/components/vs-form'
import vsItem from 'src/components/vs-item'
import Plugintest from 'plugintest'

Vue.use(Vuetify)
Vue.use(Plugintest)

Vue.config.productionTip = false

Vue.component('vs-form', vsForm)
Vue.component('vs-item', vsItem)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
