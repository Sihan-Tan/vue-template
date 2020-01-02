/* 解决弹出层滚动穿透
 * 引入该方法并调用，只需调用一次
 * 缓存返回值到变量a
 * 在弹出层需要禁止穿透时传a(true)
 * 恢复传a(false)
 */

// 深克隆
import clone from 'lodash.clonedeep';
import router from '@/router';
export const deepClone = clone;
// 防抖
export function debounce(func, delay) {
  let timer;
  // ...args指func的参数，args指func的参数组,相当于arguments,var args = arguments
  return function (...args) {
    if (timer){
      clearTimeout(timer);
    }
    // console.log(arguments, args)
    timer = setTimeout(() => {
      // 调用func,传入args参数数组
      func.apply(this, args);
    }, delay);
  };
}

export function fixedRollThrough() {
  const bodyEl = document.body;
  let top = window.scrollY;
  return function (forbidScroll) {
    // 禁止穿透
    if (forbidScroll){
      top = window.scrollY;
      bodyEl.style.position = 'fixed';
      bodyEl.style.top = `${-top}px`;
      bodyEl.style.left = '0';
      bodyEl.style.right = '0';
    } else {
      bodyEl.style.position = '';
      bodyEl.style.top = '';
      bodyEl.style.left = '';
      bodyEl.style.right = '';
      window.scrollTo(0, top);
    }
  };
}
// 未知链接或外链通用跳转方法
export function jumpLink({ url = '', isReplaceRouter = false }) {
  if (!url){
    return;
  }
  // 内链
  const hash = url.split(location.origin + location.pathname)[1];
  if (hash){
    if (isReplaceRouter){
      router.replace({
        path: `/${hash.split('#/')[1]}`
      });
    } else {
      router.push({
        path: `/${url.split('#/')[1]}`
      });
    }
  } else {
    // 外链
    if (!/http:\/\/|https:\/\/|\/\//.test(url)){
      url = `//${url}`;
    }
    if (isReplaceRouter){
      location.replace(url);
    } else {
      location.href = url;
    }
  }
}

export function isWeChat() {
  const ua = window.navigator.userAgent.toLowerCase();
  /* eslint-disable */
  return ua.match(/MicroMessenger/i) == 'micromessenger';
  /* eslint-disable */
}

// 解决输入框，文本域软键盘收起页面不会弹问题（失去焦点时调用该方法）
export function pageHoming() {
  setTimeout(function() {
    let scrollHeight =
      document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
  }, 100);
}
/* 按格式输出日期 */
export function formatDate(fmt, date) {
  var o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  // 年份格式
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      // fmt = fmt.replace(RegExp.$1, o[k])
      // 根据要求补0
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
}

function moreYear(dYear, dMonth, dDay) {
  if (dMonth > 0) {
    return dYear + '岁';
  } else if (dMonth === 0) {
    if (dDay >= 0) {
      return dYear + '岁';
    } else {
      return dYear - 1 + '岁';
    }
  } else {
    return dYear - 1 + '岁';
  }
}

function oneYear(dYear, dMonth, dDay) {
  if (dMonth > 0) {
    return dYear + '岁';
  } else if (dMonth === 0) {
    if (dDay >= 0) {
      return dYear + '岁';
    } else {
      return '11个月';
    }
  } else {
    return 12 + dMonth + '个月';
  }
}

function currentYear(dMonth, dDay) {
  if (dMonth > 1) {
    if (dDay >= 0) {
      return dMonth + '个月';
    } else {
      return dMonth - 1 + '个月';
    }
  } else if (dMonth === 1) {
    if (dDay >= 0) {
      return dMonth + '个月';
    } else {
      return '未满月';
    }
  } else {
    return '未满月';
  }
}

// 计算年龄
export function calcAge(age) {
  // '1993-10-01'
  if (!age) {
    return '';
  }
  let date = new Date();
  let [cYear, cMonth, cDay] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ];
  let [year, month, day] = age.split('-');
  let [dYear, dMonth, dDay] = [cYear - year, cMonth - month, cDay - day];
  if (dYear > 1) {
    return moreYear(dYear, dMonth, dDay);
  } else if (dYear === 1) {
    return oneYear(dYear, dMonth, dDay);
  } else {
    return currentYear(dMonth, dDay);
  }
}

// 倒计时
/**
 *
 * @param {时间对象} time 传入时间
 * @param {格式化字符串} format dd天hh小时mm分ss秒  默认为‘hh小时mm分钟’
 * @param {额外配置} options 为空时，倒计时为24小时；为数值型时，倒计时单位为 小时；为对象时，根据 unit 计时单位，number 数量
 * @returns {已格式化的字符串，相差的时间毫秒值} {format, diff}
 */
export function countDown(time, format = 'hh小时mm分钟', options) {
  // format
  // 获取当前时间
  let now = new Date().getTime();
  // 设置截止时间
  let end = time.getTime();
  let type = Object.prototype.toString.call(options);
  // 时间差
  // let diff = Math.floor(end - now + (3600 * unit * 1000))

  // ----
  let diff = null;
  // 判断参数
  switch (type) {
    case '[object Number]':
      diff = Math.floor(end - now + 3600 * options * 1000);
      break;
    case '[object Undefined]':
      options = {
        unit: 'day',
        number: 1
      };
    case '[object Object]':
      diff = calcDiff(end, now, options);
      break;
    default:
      throw Error('arguments options is Error in tool.js ');
  }
  // ----

  let dd = Math.floor(diff / (24 * 60 * 60 * 1000));
  //计算小时数
  let hourLevel = diff % (24 * 60 * 60 * 1000);
  let hh = Math.floor(hourLevel / (60 * 60 * 1000));
  //计算分钟数
  let minutesLevel = hourLevel % (60 * 60 * 1000);
  let mm = Math.floor(minutesLevel / (60 * 1000));
  //计算秒数
  let ss = Math.round((minutesLevel % (60 * 1000)) / 1000);

  let o = {
    'd+': dd, // 日
    'h+': hh, // 小时
    'm+': mm, // 分
    's+': ss // 秒
  };
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      // 根据要求补0
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }

  return { format, diff };
}

// 计算时间差
function calcDiff(end, now, { unit, number }) {
  let ss = 0;
  switch (unit) {
    case 'day':
      ss = 60 * 60 * 24 * number * 1000;
      break;
    case 'hour':
      ss = 60 * 60 * number * 1000;
      break;
    case 'minute':
      ss = 60 * number * 1000;
      break;
    case 'second':
      ss = number * 1000;
      break;
  }
  return Math.floor(end - now + ss);
}

// 页面滚动到底部
export function scrollDown() {
  setTimeout(function() {
    let scrollHeight =
      document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
  }, 0);
}

// 节流
export function throttle(func, delay) {
  var prev = Date.now();
  return function() {
    var context = this;
    var args = arguments;
    var now = Date.now();
    if (now - prev >= delay) {
      func.apply(context, args);
      prev = Date.now();
    }
  };
}
