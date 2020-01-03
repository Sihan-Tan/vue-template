if (process.env.NODE_ENV === 'development'){
  global.baseUrl = 'api/';
} else {
  global.baseUrl = location.href.split('frontend/h5')[0];
}
global.pathname = 'web_api/app/api/';

global.TOAST_TIME = 1500;

