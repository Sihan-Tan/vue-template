module.exports = {
  presets: [
    ['@babel/preset-env',
      {
        modules: false
      }
    ],
    '@vue/app'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: name => `${name}/style/less`
    }, 'vant']
  ]
};
