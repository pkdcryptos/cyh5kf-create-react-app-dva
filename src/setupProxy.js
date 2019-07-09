const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/house', { target: 'https://evaluatepre.jd.com' }));
  app.use(proxy('/vehicle', { target: 'https://evaluatepre.jd.com' }));
  app.use(
    proxy("/dqjh/*", {
        target: 'http://192.168.40.10:8080', // 王华峰
        // target: 'http://192.168.40.5:8080', // 沈韬
        secure: false,
        pathRewrite: {
          '^/dqjh': ''
        }
    })
  );
  
};