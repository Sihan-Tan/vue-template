import http from './http';
    
// 获取用户信息
export function info(id) {
  return http({
    url: '/home/info',
    method: 'get',
    params: {
      id
    }
  });
}
    
export function name(params) {
  return http({
    url: '/home/name',
    method: 'get',
    params
  });
}
    
export function login(data) {
  return http({
    url: '/home/login',
    method: 'post',
    data
  });
}
    
export function register(id) {
  return http({
    url: '/home/register',
    method: 'post',
    data: {
      id
    }
  });
}