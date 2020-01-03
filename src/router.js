import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
// console.log(wechatSDK)

import { Toast } from 'vant';

Vue.use(Router).use(Toast);

const router = new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition){
      return savedPosition;
    } 
    if (from.meta.keepAlive){
      from.meta.savedPosition =
          document.documentElement.scrollTop || document.body.scrollTop;
    }
    return { x: 0, y: to.meta.savedPosition || 0 };
    
  },
  routes: []
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  // 多级路由
  // if (to.matched.length > 1) {
  //   to.matched.forEach(route => {
  //     if (route.meta.keepAlive) {
  //       store.commit('SET_KEEPALIVEPAGES', route.name)
  //     }
  //   })
  // } else if (to.meta.keepAlive) {
  // }
  if (to.meta.keepAlive){
    store.commit('SET_KEEPALIVEPAGES', to.name);
  }

  Toast.clear();
  next();
});
router.afterEach((to, from) => {
  /* 设置微信分享 */
  setTimeout(() => {
    const currentPath = to.path;
    const reg = /^\/doctor/;
    // let doctorUrl =
    //   'http://test.daishutijian.com/InternetHospital/web_api/app/api/wxLogin/doctor'
    const doctorUrl = `${window.baseUrl}${
      window.pathname
    }wxLogin/doctor?toUrl=${encodeURIComponent(document.URL)}&isShare=1`;
    let link;
    // 用户端分享到当前页 医生端分享到授权页 登录页分享到对应首页
    if (to.name === 'login'){
      link =
        +to.query.isDoctor === 1 ? doctorUrl : `${document.URL.split('#')[0]}#/user`;
      // link = document.URL.split('#')[0] + '#/user'
    } else {
      link = reg.test(currentPath)
        ? doctorUrl
        : document.URL;
    }
  }, 100);
});

export default router;
