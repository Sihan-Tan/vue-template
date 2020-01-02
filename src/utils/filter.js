import Vue from 'vue';

// 隐藏身份证
Vue.filter('hiddenIdentify', (val) => {
  let reg = /^\d{3}(\d{11})\d{3}[\dxX]$/g;
  let key = '';
  if (val.length === 15){
    reg = /^\d{3}(\d{8})\d{3}[\dxX]$/g;
  }
  if (reg.test(val)){
    key = RegExp.$1;
    return val.replace(key, '*'.repeat(key.length));
  } 
  return '身份证格式错误';
  
});

// 隐藏手机号
Vue.filter('hiddenTel', (val) => {
  const reg = /^1\d{2}(\d{5})\d{3}$/g;
  let key = '';
  if (reg.test(val)){
    key = RegExp.$1;
    return val.replace(key, '*'.repeat(key.length));
  } 
  return '手机号格式错误';
  
});
