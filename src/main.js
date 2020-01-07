import Vue from 'vue';
import App from './App.vue';
import '@/config/global';
import router from './routes';
import store from './store';
import '@/utils/rem';
import api from '@/api';

Vue.config.productionTip = false;
Vue.prototype.$api = api;

new Vue({
  el: '#app',
  router,
  store,
  render: render => render(App)
});
