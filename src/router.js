import Vue from 'vue';
import Router from 'vue-router';
import Index from './pages/Index';
import store from '@/store';
import wechatSDK from '@/utils/wechatSDK';
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
  routes: [
    {
      path: '/',
      redirect: '/user',
      name: 'index',
      component: Index,
      meta: {
        title: '在线问诊'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ './pages/login/login'),
      meta: {
        title: '登录'
      }
    },
    // 用户端
    {
      path: '/user',
      name: 'user',
      redirect: '/user/home',
      component: () =>
        import(/* webpackChunkName: "user" */ './pages/user/home'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () =>
            import(
              /* webpackChunkName: "userHome" */ './pages/user/home/index'
            ),
          meta: {
            title: '首页'
          }
        },
        {
          path: 'doctor',
          name: 'doctor-list',
          component: () =>
            import(
              /* webpackChunkName: "doctorList" */ './pages/user/doctor/list'
            ),
          meta: {
            title: '医生列表',
            keepAlive: true
          }
        },
        {
          path: 'doctor-detail/:id',
          name: 'doctor-detail',
          component: () =>
            import(
              /* webpackChunkName: "doctorDetail" */ './pages/user/doctor/detail'
            ),
          meta: {
            title: '医生详情'
          }
        },
        {
          path: 'describe1',
          name: 'describe-1',
          component: () =>
            import(
              /* webpackChunkName: "describe1" */ './pages/user/describe/describe-1'
            ),
          meta: {
            title: '描述病情'
          }
        },
        {
          path: 'describe2',
          name: 'describe-2',
          component: () =>
            import(
              /* webpackChunkName: "describe2" */ './pages/user/describe/describe-2'
            ),
          meta: {
            title: '描述病情'
          }
        },
        {
          path: 'disease-info',
          name: 'disease-info',
          component: () =>
            import(
              /* webpackChunkName: "disease-info" */ './pages/user/describe/disease-info'
            ),
          meta: {
            title: '病情资料'
          }
        },
        {
          path: 'message',
          name: 'user-message-list',
          component: () =>
            import(
              /* webpackChunkName: "messageList" */ './pages/user/message/list'
            ),
          meta: {
            title: '我的消息',
            keepAlive: true
          }
        },
        {
          path: 'message-detail/:id',
          name: 'user-message-detail',
          component: () =>
            import(
              /* webpackChunkName: "messageDetail" */ './pages/user/message/detail'
            ),
          meta: {
            title: '沟通详情',
            keepAlive: true
          }
        },
        {
          path: 'call',
          name: 'call',
          component: () =>
            import(/* webpackChunkName: "messageCall" */ './pages/call/call'),
          meta: {
            title: '视频通话'
          }
        },
        {
          path: 'user-center',
          name: 'user-center',
          component: () =>
            import(
              /* webpackChunkName: "userCenter" */ './pages/user/center/index'
            ),
          meta: {
            title: '我的',
            keepAlive: true
          }
        },
        {
          path: 'inquiry',
          name: 'inquiry',
          component: () =>
            import(
              /* webpackChunkName: "inquiry" */ './pages/user/inquiry/list'
            ),
          meta: {
            title: '问诊订单',
            keepAlive: true
          }
        },
        {
          path: 'inquiry-detail/:id',
          name: 'inquiry-detail',
          component: () =>
            import(
              /* webpackChunkName: "inquiryDetail" */ './pages/user/inquiry/detail'
            ),
          meta: {
            title: '订单详情'
          }
        },
        {
          path: 'inquiry-pay/:id',
          name: 'inquiry-pay',
          component: () =>
            import(
              /* webpackChunkName: "inquiryPay" */ './pages/user/inquiry/pay'
            ),
          meta: {
            title: '支付结果'
          }
        },
        {
          path: 'drug',
          name: 'drug',
          component: () =>
            import(/* webpackChunkName: "drug" */ './pages/user/drug/list'),
          meta: {
            title: '药品订单'
          }
        },
        {
          path: 'drug-detail/:id',
          name: 'drug-detail',
          component: () =>
            import(
              /* webpackChunkName: "drugDetail" */ './pages/user/drug/detail'
            ),
          meta: {
            title: '订单详情'
          }
        },
        {
          path: 'drug-pay/:id',
          name: 'drug-pay',
          component: () =>
            import(/* webpackChunkName: "drugPay" */ './pages/user/drug/pay'),
          meta: {
            title: '支付结果'
          }
        },
        {
          path: 'medicine/:id',
          name: 'medicine',
          component: () =>
            import(
              /* webpackChunkName: "medicine" */ './pages/user/drug/medicine'
            ),
          meta: {
            title: '药品详情'
          }
        },
        {
          path: 'prescription',
          name: 'prescription-list',
          component: () =>
            import(
              /* webpackChunkName: "prescriptionList" */ './pages/user/prescription/list'
            ),
          meta: {
            title: '我的处方'
          }
        },
        {
          path: 'prescription-detail/:id',
          name: 'prescription-detail',
          component: () =>
            import(
              /* webpackChunkName: "prescriptionDetail" */ './pages/user/prescription/detail'
            ),
          meta: {
            title: '处方详情'
          }
        },
        {
          path: 'prescription-bow/:id',
          name: 'prescription-bow',
          component: () =>
            import(
              /* webpackChunkName: "prescriptionBow" */ './pages/user/prescription/bow'
            ),
          meta: {
            title: '处方详情'
          }
        },
        {
          path: 'family',
          name: 'family-list',
          component: () =>
            import(
              /* webpackChunkName: "familyList" */ './pages/user/family/list'
            ),
          meta: {
            title: '家庭档案'
          }
        },
        {
          path: 'family-detail',
          name: 'family-detail',
          component: () =>
            import(
              /* webpackChunkName: "familyDetail" */ './pages/user/family/detail'
            ),
          meta: {
            title: '新增档案'
          }
        },
        {
          path: 'set',
          name: 'set',
          component: () =>
            import(/* webpackChunkName: "set" */ './pages/user/set/index'),
          meta: {
            title: '设置'
          }
        },
        {
          path: 'address',
          name: 'address-list',
          component: () =>
            import(
              /* webpackChunkName: "addressList" */ './pages/user/address/list'
            ),
          meta: {
            title: '地址管理'
          }
        },
        {
          path: 'address-detail',
          name: 'address-detail',
          component: () =>
            import(
              /* webpackChunkName: "addressDetail" */ './pages/user/address/detail'
            ),
          meta: {
            title: '新增地址'
          }
        },
        {
          path: 'password',
          name: 'password',
          component: () =>
            import(
              /* webpackChunkName: "password" */ './pages/user/set/password'
            ),
          meta: {
            title: '设置/修改密码'
          }
        },
        {
          path: 'telephone-start',
          name: 'telephone-start',
          component: () =>
            import(
              /* webpackChunkName: "telephoneStart" */ './pages/user/telephone/start'
            ),
          meta: {
            title: '换绑手机'
          }
        },
        {
          path: 'telephone-finish',
          name: 'telephone-finish',
          component: () =>
            import(
              /* webpackChunkName: "telephoneFinish" */ './pages/user/telephone/finish'
            ),
          meta: {
            title: '换绑手机'
          }
        },
        {
          path: 'feedback',
          name: 'feedback',
          component: () =>
            import(
              /* webpackChunkName: "feedback" */ './pages/user/set/feedback'
            ),
          meta: {
            title: '意见反馈'
          }
        },
        {
          path: 'about',
          name: 'about',
          component: () =>
            import(/* webpackChunkName: "about" */ './pages/user/set/about'),
          meta: {
            title: '关于我们'
          }
        }
      ]
    },
    // 医生端
    {
      path: '/doctor',
      name: 'doctor',
      redirect: 'doctor/home',

      component: () =>
        import(/* webpackChunkName: "doctorHome" */ './pages/doctor/home'),
      children: [
        {
          path: 'auth',
          name: 'auth',
          redirect: 'auth/basic',
          component: () =>
            import(
              /* webpackChunkName: "authHome" */ './pages/doctor/auth/home'
            ),
          meta: {
            title: '医生认证'
          },
          children: [
            {
              path: 'basic',
              name: 'auth-basic',
              component: () =>
                import(
                  /* webpackChunkName: "authBasic" */ './pages/doctor/auth/basic'
                ),
              meta: {
                title: '医生认证'
              }
            },
            {
              path: 'instr',
              name: 'auth-instr',
              component: () =>
                import(
                  /* webpackChunkName: "authInstr" */ './pages/doctor/auth/instr'
                ),
              meta: {
                title: '医生认证'
              }
            },
            {
              path: 'license',
              name: 'auth-license',
              component: () =>
                import(
                  /* webpackChunkName: "authLicense" */ './pages/doctor/auth/license'
                ),
              meta: {
                title: '医生认证'
              }
            }
          ]
        },
        {
          path: 'auth-result',
          name: 'auth-result',
          component: () =>
            import(
              /* webpackChunkName: "authResult" */ './pages/doctor/auth/result'
            ),
          meta: {
            title: '医生认证'
          }
        },
        // 患者详情
        {
          path: 'patient-detail/:id',
          name: 'patient-detail',
          component: () =>
            import(
              /* webpackChunkName: "patientDetail" */ './pages/doctor/patient/detail'
            ),
          meta: {
            title: '患者详情'
          }
        },

        {
          path: 'message',
          name: 'doctor-message-list',
          component: () =>
            import(
              /* webpackChunkName: "messageList" */ './pages/doctor/message/list'
            ),
          meta: {
            title: '我的消息',
            keepAlive: true
          }
        },
        {
          path: 'message-detail/:id',
          name: 'doctor-message-detail',
          component: () =>
            import(
              /* webpackChunkName: "messageDetail" */ './pages/doctor/message/detail'
            ),
          meta: {
            title: '沟通详情',
            keepAlive: true
          }
        },
        {
          path: 'call',
          name: 'call',
          component: () =>
            import(/* webpackChunkName: "messageCall" */ './pages/call/call'),
          meta: {
            title: '视频通话'
          }
        },
        {
          path: 'home',
          name: 'doctor-index',
          component: () =>
            import(
              /* webpackChunkName: "doctorIndex" */ './pages/doctor/home/index'
            ),
          meta: {
            title: '在线接诊'
          }
        },
        {
          path: 'user-center',
          name: 'doctor-center',
          component: () =>
            import(
              /* webpackChunkName: "doctorCenter" */ './pages/doctor/center/index'
            ),
          meta: {
            title: '我的',
            keepAlive: true
          }
        },
        {
          path: 'order',
          name: 'order-list',
          component: () =>
            import(
              /* webpackChunkName: "orderList" */ './pages/doctor/order/order'
            ),
          meta: {
            title: '我的订单',
            keepAlive: true
          }
        },
        {
          path: 'order-detail/:id',
          name: 'order-detail',
          component: () =>
            import(
              /* webpackChunkName: "orderDetail" */ './pages/doctor/order/detail'
            ),
          meta: {
            title: '订单详情'
          }
        },
        {
          path: 'prescription-detail/:id',
          name: 'doctor-prescription-detail',
          component: () =>
            import(
              /* webpackChunkName: "doctorPrescriptionDetail" */ './pages/doctor/prescription/detail'
            ),
          meta: {
            title: '处方详情'
          }
        },
        {
          path: 'prescribe1',
          name: 'doctor-prescribe1',
          component: () =>
            import(/* webpackChunkName: "doctorPrescribe1" */ './pages/doctor/prescription/prescribe1'),
          meta: {
            title: '开具处方'
          }
        },
        {
          path: 'prescribe2',
          name: 'doctor-prescribe2',
          component: () =>
            import(/* webpackChunkName: "doctorPrescribe2" */ './pages/doctor/prescription/prescribe2'),
          meta: {
            title: '开具处方'
          }
        },
        {
          path: 'prescribe-medicine',
          name: 'prescribe-medicine',
          component: () =>
            import(/* webpackChunkName: "prescribeMedicine" */ './pages/doctor/prescription/prescribe-medicine'),
          meta: {
            title: '添加药品'
          }
        },
        {
          path: 'medicine/:id',
          name: 'doctor-medicine',
          component: () =>
            import(
              /* webpackChunkName: "doctorPrescriptionDetail" */ './pages/doctor/prescription/medicine'
            ),
          meta: {
            title: '药品详情'
          }
        },
        {
          path: 'doctor-prescription-bow/:id',
          name: 'doctor-prescription-bow',
          component: () =>
            import(
              /* webpackChunkName: "doctorPrescriptionBow" */ './pages/doctor/prescription/bow'
            ),
          meta: {
            title: '处方详情'
          }
        },
        {
          path: 'doctor-info',
          name: 'doctor-info',
          component: () =>
            import(
              /* webpackChunkName: "doctorInfo" */ './pages/doctor/center/info'
            ),
          meta: {
            title: '基本资料',
            keepAlive: true
          }
        },
        {
          path: 'doctor-intro',
          name: 'doctor-intro',
          component: () =>
            import(
              /* webpackChunkName: "doctorIntro" */ './pages/doctor/center/intro'
            ),
          meta: {
            title: '个人介绍'
          }
        },
        {
          path: 'doctor-wallet',
          name: 'doctor-wallet',
          component: () =>
            import(
              /* webpackChunkName: "doctorWallet" */ './pages/doctor/wallet/index'
            ),
          meta: {
            title: '我的钱包'
          }
        },
        {
          path: 'wallet-bank',
          name: 'doctor-wallet-bank',
          component: () =>
            import(
              /* webpackChunkName: "doctorWalletBank" */ './pages/doctor/wallet/bank'
            ),
          meta: {
            title: '添加银行卡'
          }
        },
        {
          path: 'wallet-detail',
          name: 'doctor-wallet-detail',
          component: () =>
            import(
              /* webpackChunkName: "doctorWalletDetail" */ './pages/doctor/wallet/detail'
            ),
          meta: {
            title: '收益明细'
          }
        }
      ]
    }
  ]
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
    wechatSDK(
      {
        title: to.meta.title,
        desc: '雨昕国际,在线问诊',
        link,
        imgUrl:
          'http://public-10006067.file.myqcloud.com/upload/imagelist/ori/report/dev/02a6e17c2b4eb9f4a6c57152d74a35e1.png'
      },
      to
    );
  }, 100);
});

export default router;
