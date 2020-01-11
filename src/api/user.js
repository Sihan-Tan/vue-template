import http from './http';
    
export function user(params) {
  return http({
    url: '/user/user',
    method: 'get',
    params
  });
}
    
export function token(params) {
  return http({
    url: '/user/token',
    method: 'get',
    params
  });
}
    
export function password(data) {
  return http({
    url: '/user/password',
    method: 'post',
    data
  });
}