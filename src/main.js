import Vue from 'vue';
import App from './App.vue';
import '@/config/global';
import router from './router';
import store from './store/index';
import '@/utils/rem';
import '@/assets/css/index.less';
import api from '@/api';
import waves from '@/directives/waves';
import { Toast, Lazyload, Dialog, ImagePreview, Image } from 'vant';
import VConsole from 'vconsole';
import '@/icons'; // 引入svg当做icon

// 设置默认配置
Toast.setDefaultOptions({
  duration: global.TOAST_TIME,
  closeOnClick: true
});

Vue.directive('waves', waves);
Vue.use(Toast).use(Lazyload)
  .use(Dialog)
  .use(ImagePreview)
  .use(Image);

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.defaultAvatar = require('@/assets/images/global_defaultavatar.png');
Vue.prototype.defaultMedicine = require('@/assets/images/global_defaultMedicine.png');

new Vue({
  router,
  store,
  render: render => render(App)
}).$mount('#app');
// 测试环境开调试
if (location.href.match(/console=1/)){
  /* eslint-disable */
  new VConsole()
  /* eslint-disable */
}
