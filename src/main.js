import Vue from 'vue';
import App from './App.vue';
import '@/config/global';
import router from './router';
import store from './store/index';
import '@/utils/rem';
import api from '@/api';
import waves from '@/directives/waves';
// import '@/icons'; // 引入svg当做icon

Vue.directive('waves', waves);

Vue.config.productionTip = false;
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: render => render(App)
}).$mount('#app');
