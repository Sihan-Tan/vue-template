const pluginName = 'AutoCreateApi';
const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');

const defaultOptions = {
  methods: ['get', 'post'],
  split: '--',
  output: path.resolve(__dirname, '..', 'src/api')
};

class AutoCreateApi {
  constructor(apiConfig, options) {
    this.apiConfig = apiConfig || {};
    this.options = merge(defaultOptions, options);
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
      this.writeFileText();
      callback();
    });
    // compiler.hooks.run.tapPromise(pluginName, async (compilation, callback) => {
    //   await new Promise(() => this.writeFileText());
    //   callback();
    // });
  }

  // 写入文件
  writeFileText() {
    const files = Object.keys(this.apiConfig);
    const defaultPath = this.options.output;
    for (let i = 0; i < files.length; i += 1){
      const dirName = files[i];
      fs.writeFileSync(path.resolve(defaultPath, '.', `${dirName}.js`), this.generateText(dirName, this.apiConfig), (err, data) => {
        console.log(err, data);
      });
    }
    console.log('done: 接口自动生成完成');
  }

  // 生成文本串
  generateText(dir, apiConfig) {
    const gets = apiConfig[dir].get || [];
    const posts = apiConfig[dir].post || [];
    let str = `import http from './http';`;
    gets.forEach(item => {
      str += this.generateRequest(dir, item, 'get');
    });
    posts.forEach(item => {
      str += this.generateRequest(dir, item, 'post');
    });
    return str;
  }

  // 根据方法生成请求
  generateRequest(dir, item, method) {
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
export function ${this.generateName(name)}(${this.generateGetName(name, method)}) {
  return http({
    url: '/${dir}/${this.generateName(name)}',
    method: '${method}',
    ${this.generateGetParams(name, method)}
  });
}`;
  }

  // 生成方法名
  generateName(name) {
    return name.split(this.options.split)[0];
  }

  // 生成形参
  generateGetName(name, method) {
    const key = name.split(this.options.split)[1];
    if (key){
      return key;
    } 
    return `${this.generateType(method)}`;
  }

  // 生成参数
  generateGetParams(name, method) {
    const key = name.split(this.options.split)[1];
    if (key){
      return `${this.generateType(method)}: {
      ${key}
    }`;
    } 
    return `${this.generateType(method)}`;
  }

  // 返回type
  generateType(method) {
    return method === 'post' ? 'data' : 'params';
  }

}

module.exports = AutoCreateApi;
