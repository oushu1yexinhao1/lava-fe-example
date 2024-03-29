/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const modifyVars = require('./src/smart-ui-vue/modifyVars.ts')
const { name } = require('./package.json')

const SERVER_PORT = 3013

module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: { // 配置跨域
      '/api': {
        target: 'http://127.0.0.1:4523/mock/396357',
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '/', // 请求的时候使用这个api就可以
        },
      },
    },
    port: SERVER_PORT,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.js', '.vue', '.json'],
    },
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
    plugins: [
      new AntdDayjsWebpackPlugin({ preset: 'antdv3' })
    ]
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(path.resolve('src/assets/icons'))
      .add(path.resolve('src/smart-ui-vue/assets/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve('src/assets/icons'))
      .add(path.resolve('src/smart-ui-vue/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: filePath => {
          const newPath = filePath.split(path.sep).join('/')
          return newPath.substring(newPath.indexOf('icons/')).replace('icons/', `${name}/`).replace('.svg', '')
        },
      })

    config.module
      .rule('scss').oneOfs.store
      .forEach(item => {
        item
          .use('sass-resources-loader')
          .loader('sass-resources-loader')
          .options({
            resources: ['src/smart-ui-vue/styles/variables.scss', 'src/smart-ui-vue/styles/mixins.scss'],
          })
          .end()
      })
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars,
          javascriptEnabled: true,
        },
      },
    },
  },
}
