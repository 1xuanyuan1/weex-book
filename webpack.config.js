const path = require('path')
const webpack = require('webpack')

const bannerPlugin = new webpack.BannerPlugin({
  banner: '// { "framework": "Vue" }\n',
  raw: true
})
const projectRoot = path.resolve(__dirname, '../')
function getBaseConfig (filename, loaders) {
  return {
    entry: {
      'app': path.resolve('src', 'app')
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename
    },
    resolve: {
      extensions: [
        '.js', '.vue'
      ],
      alias: {
        'src': path.resolve(__dirname, 'src'),
        'utils': path.resolve(__dirname, 'src/utils'),
        'views': path.resolve(__dirname, 'src/views'),
        'style': path.resolve(__dirname, 'src/style'),
        'service': path.resolve(__dirname, 'src/service')
      }
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
          loaders
        }
      ]
    },
    plugins: [
      // new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }}),
      bannerPlugin
    ]
  }
}

var webConfig = getBaseConfig('[name].web.js', ['vue-loader'])
var nativeConfig = getBaseConfig('[name].weex.js', ['weex-loader'])

module.exports = [webConfig, nativeConfig]
