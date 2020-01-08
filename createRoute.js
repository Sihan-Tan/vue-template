const fs = require('fs');
const path = require('path');

// 获取文件列表
function readFileList(dir) {
  const files = fs.readdirSync(dir);
  return files.map((item, index) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()){
      return {
        path: item,
        name: item,
        fullPath,
        children: readFileList(path.join(dir, item))
      }; // 递归读取文件
    }
    return {
      path: item,
      name: item,
      fullPath
    };
  });
}

const filesList = readFileList('src/views');

fs.writeFileSync('./src/routes/route.js', `module.exports = [${generateRoute(filesList)}]`, (err, data) => {
  if (err){
    console.log(err);
  } else {
    console.log(data);
  }
});

function generateRoute(routes, father = {}, level = 0) {
  const res = [];
  for (let ind = 0; ind < routes.length; ind += 1){
    const item = routes[ind];
    if (item.children && item.children.length){
      res.push(`
      {
          path: '${generatePath(item, level)}',
          redirect: '${generateRedirect(item, level)}',
          component: () => import(/* webpackChunkName: "${getName(item)}" */ '${getAliasPath(item)}/index.vue'),
          children: [${generateRoute(item.children, item, level + 1)}]
      }`);
    } 
    if (item.path.includes('.vue') && item.path !== 'index.vue'){
      res.push(`{
        path: '${generatePath(item, level)}',
        name: '${getName(item)}',
        component: () => import(/* webpackChunkName: "${getName(item)}" */ '${getAliasPath(item)}'),
        meta: {
            title: '${getTitle(item) || ''}',
            keepAlive: '${getKeep(item) || ''}',
            desc: '${getDesc(item) || ''}'
        }
      }`);
    } 
  }
  return res;
}

/**
 * 工具函数
 */
// 从文件名获取参数
function getParams(path) {
  const extIndex = path.indexOf('.vue');
  let fileName = path;
  if (extIndex > -1){
    fileName = path.slice(0, extIndex);
  }
  const paramsArr = fileName.split('_');
  return {
    path: paramsArr[0],
    id: paramsArr[1],
    title: paramsArr[2],
    keepAlive: paramsArr[3],
    desc: paramsArr[4]
  };
}

// 获取文件名
function getPath({ path }) {
  return getParams(path).path;
}

// 获取name
function getName({ fullPath }) {
  return fullPath.replace(/\\/g, '/').replace('src/views/', '')
    .replace(/\//g, '-')
    .replace(/_.*\.vue$/, '')
    .replace(/\.vue$/, '');
}

// 获取id
function getID({ path }) {
  return getParams(path).id;
}

// 获取title
function getTitle({ path }) {
  return getParams(path).title;
}

// 获取keepAlive
function getKeep({ path }) {
  return getParams(path).keepAlive;
}

// 获取描述
function getDesc({ path }) {
  return getParams(path).desc;
}

// 将全路径转为别名路径
function getAliasPath({ fullPath }) {
  return fullPath.replace(/\\/g, '/').replace('src', '@');
}

// 生成path
function generatePath(item, level) {
  const path = getID(item) ? `${getPath(item)}/:${getID(item)}` : getPath(item);
  return level ? path : `/${path}`;
}

// 生成重定向
function generateRedirect(item, level) {
  return `${generatePath(item, level)}/${getPath(item)}`;
}
