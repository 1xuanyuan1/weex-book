const path = require('path')
const webpack = require('webpack')

const bannerPlugin = new webpack.BannerPlugin({
  banner: '// { "framework": "Vue" }\n',
  raw: true
})
const projectRoot = path.resolve(__dirname, '../')
function getBaseConfig () {
  return {
    entry: {
      'app': path.resolve('src', 'app')
    },
    output: {
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.(vue|js)$/,
          loader: 'eslint-loader',
          enforce: "pre"
        }, {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }, {
          test: /\.vue(\?[^?]+)?$/,
          loaders: []
        }
      ]
    },
    plugins: [
      // new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }}),
      bannerPlugin
    ]
  }
}

var webConfig = getBaseConfig()
webConfig.output.filename = '[name].web.js'
webConfig.module.rules[2].loaders.push('vue-loader')

var nativeConfig = getBaseConfig()
nativeConfig.output.filename = '[name].weex.js'
nativeConfig.module.rules[2].loaders.push('weex-loader')

module.exports = [webConfig, nativeConfig]
