const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@root', resolve(''))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@com', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@tools', resolve('src/tools'))
  },
  runtimeCompiler: true,
  devServer: {
    port: 8885,
    proxy: {      
      '/api/authcenter': {
        // target: 'http://tms-dev.dj.com',
        target: 'http://tms-uat.dj.com/api',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api/authcenter': '/authcenter'
        }
      },      
      '/api/common': {
        // target: 'http://tms-dev.dj.com',
        target: 'http://tms-uat.dj.com/api',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api/common': '/common'
        }
      },
      '/api': {
        // target: 'http://tms-dev.dj.com',
        target: 'https://www.easy-mock.com/mock/5d3a603a47bd1943d2334eef/waybill',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
