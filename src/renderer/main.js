import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import iView from 'iview';
import VueClipboard from 'vue-clipboard2'
// import { Button, Table, Modal } from 'iview';
// Vue.component('Button', Button);
// Vue.component('Table', Table);
// Vue.component('Modal', Modal);
import 'iview/dist/styles/iview.css';

import 'font-awesome/css/font-awesome.css'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(iView);
Vue.use(VueClipboard)
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
