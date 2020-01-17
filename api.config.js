module.exports = {
  home: {
    get: [{
      name: 'info--id',
      comment: '获取用户信息'
    }, 'name'],
    post: ['login', 'register--id']
  },
  user: {
    get: ['user', 'token'],
    post: ['password', 'userInfo']
  }
};
