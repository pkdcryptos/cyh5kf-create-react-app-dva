const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/dqjh/*',
    proxy({
        target: 'http://192.168.40.10:8080', // 王华峰
        // target: 'http://192.168.40.5:8080', // 沈韬
        // target: 'http://192.168.40.32:8090', // 王晨旭
        secure: false,
        pathRewrite: {
          '^/dqjh': ''
        },
    })
  )
  
};