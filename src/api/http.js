import axios from 'axios';
// import { Toast } from 'vant'
import qs from 'qs';
import router from '@/router';
import store from '@/store';

// create an axios instance
const service = axios.create({
  baseURL: window.baseUrl + window.pathname,
  timeout: 10000 // request timeout
});
service.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';
// 请求拦截器
/* service.interceptors.request.use(
  config => {
    const token = store.state.token
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.error(error)
  })
 */

// 响应拦截器
service.interceptors.response.use(
  response => {
    const route = router.history.current;
    if (response.status === 200){
      // 去授权
      if (response.data.code === 401){
        const beforeUrl = `${location.href.split('#')[0]}#${route.fullPath}`;
        const url = encodeURIComponent(beforeUrl);
        document.cookie = `hospital_return_url=${url};path=/`;
        location.replace(response.data.data);
      }
    } else {
      return Promise.reject(response);
    }
    return Promise.resolve(response);
  },
  error => {
    // 对不同返回码对相应处理
    // Toast('请求超时，请稍后重试')
    store.commit('SET_LOADING', false);
    return Promise.reject(error);
  }
);
function http({ url = '', method = 'get', params = {}, data = {}, type = '' }) {
  data = qs.stringify(data);
  return service({
    url,
    params,
    method,
    data
  }).then(res => {
    return res.data;
  });
}

export default http;
