const buildConfig = require('./webpack.prod.js');
const merge = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(buildConfig, {
  plugins:[
    new BundleAnalyzerPlugin({
      analyzerHost: '127.0.0.1',
      analyzerPort: 9998
    })
  ]
});