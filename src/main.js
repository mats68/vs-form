// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import {vsform} from './index'
import 'src/styles/grid.scss'

// let a = {b: 1}
// let b = {...a}
// console.log(b)

Vue.use(Vuetify)
// debugger
Vue.use(vsform)

Vue.config.productionTip = false
// debugger

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
