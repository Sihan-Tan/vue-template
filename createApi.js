const apiConfig = require('./api');
const fs = require('fs');
const path = require('path');
const defaultPath = 'src/api';

const files = Object.keys(apiConfig);
for (let i = 0; i < files.length; i++){
  const dirName = files[i];
  fs.writeFileSync(`${defaultPath}/${dirName}.js`, generateText(dirName, apiConfig), (err, data) => {
    console.log(err, data);
  });
}

// 生成文本串
function generateText(dir, apiConfig) {
  const gets = apiConfig[dir].get || [];
  const posts = apiConfig[dir].post || [];
  let str = `import http from './http';`;
  gets.forEach(item => {
    str += generateRequest(dir, item, 'get');
  });
  posts.forEach(item => {
    str += generateRequest(dir, item, 'post');
  });
  return str;
}

/**
 * get 相关生成辅助方法
 */

// 根据方法生成请求
function generateRequest(dir, item, method) {
  let name; let comment;
  if (typeof item === 'object'){
    // eslint-disable-next-line prefer-destructuring
    name = item.name;
    comment = item.comment || '';
  } else {
    name = item;
    comment = '';
  }
  return `
    ${comment ? `
    // ${comment}` : ''}
    export function ${generateName(name)}(${generateGetName(name, method)}) {
            return http({
                url: '/${dir}/${generateName(name)}',
                method: '${method}',
                ${generateGetParams(name, method)}
            });
        }`;
}

// 生成方法名
function generateName(name) {
  return name.split('--')[0];
}

// 生成形参
function generateGetName(name, method) {
  const key = name.split('--')[1];
  if (key){
    return key;
  } 
  return `${generateType(method)}`;
}

// 生成参数
function generateGetParams(name, method) {
  const key = name.split('--')[1];
  if (key){
    return `${generateType(method)}: {
        ${key}
    }`;
  } 
  return `${generateType(method)}`;
}

// 返回type
function generateType(method) {
  return method === 'post' ? 'data' : 'params';
}
