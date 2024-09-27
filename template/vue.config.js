const path = require('path');
const ip = require('ip').address();
const merge = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');

const year = new Date().getFullYear();
const month = `${new Date().getMonth() + 1}`.padStart(2, 0);

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? process.env.IS_CDN
      ? `https://activity-backoffice-cdn.thejoyrun.com/huodong/build/${year}/${month}/<%= options.name %>/dist/`
      : '/activity/<%= options.name %>/dist/'
    : '/',
  indexPath: path.resolve(__dirname, './index.html'),
  productionSourceMap: true,  // 开启生产环境source map
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    hot: true,
    open: true,
    host: ip, // ip打开
    proxy: {
      '/<%= options.name %>': {
        target: 'https://webevent-test.thejoyrun.com',
        changeOrigin: true
      },
      '/joyrun': {
        target: 'https://webevent-test.thejoyrun.com',
        changeOrigin: true
      }
    },
    clientLogLevel: 'info'
  },
  parallel: false,
  transpileDependencies: [/node_modules/],
  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        return {
          ...options,
          emitWarning: true,
          cache: false
        }
      })
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        });
        return options
      })
    if (process.env.IS_CDN) {
      config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .tap(options => {
          return {
            ...options,
            fallback: {
              ...options.fallback,
              options: {
                name: 'img/[name].[hash:8].[ext]',
                publicPath: '/activity/<%= options.name %>/dist/'
              }
            }
          }
        })
    } 
  }
}
