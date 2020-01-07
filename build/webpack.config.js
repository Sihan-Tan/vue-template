const path = require('path');
const HappyPack = require('happypack');
const os = require('os');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const vueLoaderConfig = require('./vue-loader.config');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const devMode = process.env.NODE_ENV !== 'production';
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});
const resolve = dir => path.resolve(__dirname, '..', dir);

console.log(process.env.NODE_ENV);

module.exports = {
  entry: [
    '@babel/polyfill', 
    path.resolve(__dirname, '../src/main.js')
  ], // 入口文件
  plugins:[
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : 'assets/css/[name].[contenthash:8].css',
      chunkFilename: devMode ? '[id].css' : 'assets/css/[id].[contenthash:8].css'
    }),
    new VueLoaderPlugin(),
    new HappyPack({
      id: 'happyBabel',
      loaders:[
        {
          loader: 'babel-loader',
          options: {
            presets:[
              ['@babel/preset-env']
            ],
            cacheDirectory: true,
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      ],
      threadPool: happyThreadPool
    })
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
      '@': resolve('src'),
      assets: resolve('src/assets'),
      _c: resolve('src/components')
      // views: resolve('src/views'),
      // pages: resolve('src/pages'),
      // config: resolve('src/config'),
      // api: resolve('src/api'),
      // mixin: resolve('src/mixin'),
      // store: resolve('src/store'),
      // utils: resolve('src/utils')
    },
    extensions: ['.js', '.json', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          devMode ? 'vue-style-loader' :
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../../'
              }
            }, 
          'css-loader', 
          'postcss-loader', 
          'less-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [resolve('src/assets/css/variable.less')]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude:[resolve('src/icons/svg'), /node_modules/],
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  esModule: false,
                  name: '[name].[hash:8].[ext]',
                  outputPath: 'assets/image/'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 媒体文件
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: '[name].[hash:8].[ext]',
                  outputPath: 'assets/media/'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: '[name].[hash:8].[ext]',
                  outputPath: 'assets/fonts/'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'happypack/loader?id=happyBabel'
        }
      },
      {
        test: /\.vue$/i,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons/svg')],
        exclude: /node_modules/,
        options: {
          symbolId: 'icon-[name]'
        }
      }
    ]
  }
};
