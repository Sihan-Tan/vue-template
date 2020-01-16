const Webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const baseConfig = require('./webpack.config.js');
const CreateRoutePlugin = require('../plugins/createRoute');
const AutoCreateApi = require('../plugins/createApi');
const merge = require('webpack-merge');
const resolve = dir => path.resolve(__dirname, '..', dir);

const apiConfig = require('../api.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  watchOptions: {
    ignored: [resolve('src/routes/route'), resolve('src/api')]
  },
  devServer: {
    contentBase: '..',
    port: 9999, // 端口
    hot: true, // 热更新
    historyApiFallback: true, // 页面不存在时的404
    host: 'localhost', // 主机
    inline: true,
    open: false,
    overlay: { // 错误信息
      warnings: false,
      errors: false
    },
    proxy: {
      '/api': {
        target: 'http://dev.hospital.com',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    },
    watchOptions: {
      ignored: [resolve('src/routes/route'), resolve('src/api')]
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        include: [resolve('src')],
        exclude: [/node_modules/, resolve('src/api'), resolve('src/routes/route')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true,
          fix: true
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('public/dev.html')
    }),
    new CreateRoutePlugin({
      alias: false
    }),
    // new AutoCreateApi(apiConfig, {}),
    new StyleLintPlugin({
      files: ['src/*.{vue,htm,html,css,sss,less,scss,sass}'],
      fix: true,
      cache: true,
      failOnError: false
    }),
    new Webpack.HotModuleReplacementPlugin()
  ]
});
