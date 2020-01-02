const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const multipleConfig = {
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
    header: path.resolve(__dirname, '../src/header.js')
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      chunks: ['main'] // 与入口对应的模块名
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/header.html'),
      filename: 'header.html',
      chunks: ['header'] // 与入口对应的模块名
    })
  ]
};

module.exports = merge(baseConfig, multipleConfig);
