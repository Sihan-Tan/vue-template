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
    '@babel/plugin-syntax-dynamic-import',
    // '@babel/plugin-transform-runtime',
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: name => `${name}/style/less`
    }, 'vant']
  ]
};
