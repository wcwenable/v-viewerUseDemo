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
  runtimeCompiler: true
}
