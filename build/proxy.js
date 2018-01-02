var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')

var port = process.env.PORT || 3000

var proxyTable = {
  '/api': {
     target: 'http://api.zhuishushenqi.com/',
     changeOrigin: true,
     pathRewrite: {
       '^/api': '/'
     }
   }
}
var app = express()

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

  if (req.method == 'OPTIONS') {
    res.send(200) /*让options请求快速返回*/
  }
  else {
    next()
  }
})
// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})
var uri = 'http://localhost:' + port
app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('listen: ' + uri)
})
