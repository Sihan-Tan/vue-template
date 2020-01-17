const pluginName = 'CreateRoutePlugin';
const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const resolve = dir => path.resolve(__dirname, '..', dir);

const defaultOptions = {
  dirName: resolve('src/views'), // 所需生成路由的目录
  split: '_', // 文件名分隔符
  routerViewName: '_index.vue', // 默认容器文件名
  output: { // 输出文件
    file: 'route.js',
    path: resolve('src/routes')
  },
  queue: ['path', 'id', 'title', 'keepAlive', 'desc'],
  ext: '.vue', // 文件后缀
  alias: true, // 是否使用别名
  fatherLevel: 1, // 需要出几层目录, 0 表示当前目录
  template: `
  <template>
    <div>
      <router-view></router-view>
    </div>
  </template>` // 容器文件模板
};

class CreateRoutePlugin {
  constructor(options) {
    this.options = merge(defaultOptions, options);
  }

  apply(compiler) {
    // compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
    //   this.writeStringToFile();
    //   callback();
    // });
    console.log(compiler.hooks.beforeCompile);
    compiler.hooks.beforeCompile.tapAsync(pluginName, (compilation, callback) => {
      this.writeStringToFile();
      callback();
    });
  }

  // 写入文件
  writeStringToFile() {
    const routeString = this.generateRouteString();
    const { output } = this.options;
    fs.writeFileSync(`${output.path}/${output.file}`, routeString, (err, data) => {
      if (err){
        console.log(err);
      } else {
        console.log(data);
      }
    });
    console.log('done: 路由自动生成');
  }

  // 返回路由字符串
  generateRouteString() {
    const dir = this.options.dirName;
    const filesList = this.readFileList(dir);
    return `module.exports = [${this.generateRoute(filesList)}]`;
  }

  // 生成路由字符串
  generateRoute(routes, father = {}, level = 0) {
    const res = [];
    const title = this.options.queue[2], keepAlive = this.options.queue[3], desc = this.options.queue[4];
    for (let ind = 0; ind < routes.length; ind += 1){
      const item = routes[ind];
      if (item.children && item.children.length){
        this.generateRouteView(path.resolve(item.fullPath, '.', this.options.routerViewName));
        res.push(`
        {
            path: '${this.generatePath(item, level)}',
            redirect: '${this.generateRedirect(item, level)}',
            component: () => import(/* webpackChunkName: "${this.getName(item)}" */ '${this.getAliasPath(item)}/${this.options.routerViewName}'),
            children: [${this.generateRoute(item.children, item, level + 1)}]
        }`);
      } 
      if (item.path.includes(this.options.ext) && item.path !== this.options.routerViewName){
        if (item.path === this.options.routerViewName){
          this.generateRouteView(path.resolve(item.fullPath, '.', this.options.routerViewName));
        }
        res.push(`{
          path: '${this.generatePath(item, level)}',
          name: '${this.getName(item)}',
          component: () => import(/* webpackChunkName: "${this.getName(item)}" */ '${this.getAliasPath(item)}'),
          meta: {
              ${title}: '${this.getTitle(item) || ''}',
              ${keepAlive}: '${this.getKeep(item) || ''}',
              ${desc}: '${this.getDesc(item) || ''}'
          }
        }`);
      } 
    }
    return res;
  }
  

  // 获取文件列表
  readFileList() {
    const dir = this.options.dirName;
    return getFileList(dir);
  }

  // 从文件名获取参数
  getParams(path) {
    const extIndex = path.indexOf(this.options.ext);
    let fileName = path.replace(this.options.dirName, '');
    if (extIndex > -1){
      fileName = path.slice(0, extIndex);
    }
    const paramsArr = fileName.split(this.options.split);
    const obj = {};
    this.options.queue.forEach((item, index) => {
      obj[item] = paramsArr[index];
    });
    return obj;
  }

  // 获取文件名
  getPath({ path }) {
    return this.getParams(path)[this.options.queue[0]];
  }

  // 获取name
  getName({ fullPath }) {
    const reg = new RegExp(`_.*${this.options.ext}$`);
    return fullPath.replace(resolve(this.options.dirName, '.'), '')
      .replace(/\\/g, '/')
      .replace(/\//g, '-')
      .slice(1)
      .replace(reg, '')
      .replace(new RegExp(this.options.ext), '');
  }

  // 获取id
  getID({ path }) {
    return this.getParams(path)[this.options.queue[1]];
  }

  // 获取title
  getTitle({ path }) {
    return this.getParams(path)[this.options.queue[2]];
  }

  // 获取keepAlive
  getKeep({ path }) {
    return this.getParams(path)[this.options.queue[3]];
  }

  // 获取描述
  getDesc({ path }) {
    return this.getParams(path)[this.options.queue[4]];
  }

  // 将全路径转为别名路径
  getAliasPath({ fullPath }) {
    const path = fullPath.replace(/\\/g, '/').slice(fullPath.indexOf('src'));
    let noAliasPath = path.replace(/src[\\|\/]/, '');
    noAliasPath = this.options.fatherLevel ? '../'.repeat(this.options.fatherLevel) + noAliasPath : `./${noAliasPath}`;
    return this.options.alias ? path.replace('src', '@') : noAliasPath;
  }

  // 生成path
  generatePath(item, level) {
    const path = this.getID(item) ? `${this.getPath(item)}/:${this.getID(item)}` : this.getPath(item);
    return level ? path : `/${path}`;
  }

  // 生成重定向
  generateRedirect(item, level) {
    return `${this.generatePath(item, level)}/${this.getPath(item)}`;
  }

  // 生成容器文件
  generateRouteView(file) {
    const { template } = this.options;
    fs.stat(file, (err) => {
      if (err){
        fs.writeFileSync(file, template);
      }
    });
  }
}

// 获取文件列表
function getFileList(dir) {
  const files = fs.readdirSync(dir);
  return files.map((item, index) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()){
      return {
        path: item,
        name: item,
        fullPath,
        children: getFileList(path.join(dir, item))
      }; // 递归读取文件
    }
    return {
      path: item,
      name: item,
      fullPath
    };
  });
}

module.exports = CreateRoutePlugin;
