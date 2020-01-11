import Vue from 'vue';
import Router from 'vue-router';
// const routes = require('./route');
Vue.use(Router);

const router = new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition){
      return savedPosition;
    } 
    if (from.meta.keepAlive){
      from.meta.savedPosition =
          document.documentElement.scrollTop || document.body.scrollTop;
    }
    /* eslint-disable */
    return { x: 0, y: to.meta.savedPosition || 0 };
    
  },
  routes: []
});

export default router;
