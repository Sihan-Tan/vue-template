module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'last 10 Chrome versions',
        'last 5 Firefox versions',
        'Safari >= 6',
        'ie > 8'
      ]
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
      unitPrecision: 7
    }
  }
}
