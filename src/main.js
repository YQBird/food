// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import router from './router';
import Axios from 'Axios';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.prototype.$axios = Axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',  // same to $mount('#app)
  template: '<App/>',
  components: { App },
  router
})

