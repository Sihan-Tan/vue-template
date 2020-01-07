module.exports = [
  {
    path: '/back',
    redirect: '/back/back',
    children: [{
      path: 'back',
      name: 'back-back',
      component: () => import(/* webpackChunkName: "back-back" */ '@/views/back/back.vue'),
      meta: {
        title: '',
        keepAlive: '',
        desc: ''
      }
    },{
      path: 'index',
      name: 'back-index',
      component: () => import(/* webpackChunkName: "back-index" */ '@/views/back/index.vue'),
      meta: {
        title: '',
        keepAlive: '',
        desc: ''
      }
    },
    {
      path: 'son',
      redirect: 'son/son',
      children: [{
        path: 'con',
        name: 'back-son-con',
        component: () => import(/* webpackChunkName: "back-son-con" */ '@/views/back/son/con.vue'),
        meta: {
          title: '',
          keepAlive: '',
          desc: ''
        }
      }]
    }]
  },
  {
    path: '/home',
    redirect: '/home/home',
    children: [{
      path: 'home/:id',
      name: 'home-home',
      component: () => import(/* webpackChunkName: "home-home" */ '@/views/home/home_id_哈哈_1.vue'),
      meta: {
        title: '哈哈',
        keepAlive: '1',
        desc: ''
      }
    },{
      path: 'prescribe-medicine',
      name: 'home-prescribe-medicine',
      component: () => import(/* webpackChunkName: "home-prescribe-medicine" */ '@/views/home/prescribe-medicine.vue'),
      meta: {
        title: '',
        keepAlive: '',
        desc: ''
      }
    }]
  }];
