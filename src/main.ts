import Vue from 'vue'
import App from './App.vue'
import store from './store'
import rcstore from './rcstore/RcVuex'
import './test-ts'


Vue.config.productionTip = false




Vue.use(rcstore)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
