import {HashRouter} from 'react-router-dom'
import store from 'store'
import axios from 'axios'
import { message } from 'antd'

// 请求不成功的时候
const logout = function () {
  const router = new HashRouter()
  store.set('token', '')
  store.set('userInfo', {})
  store.set('isLogin', false)
  // message.error('登录已过期！')
  router.history.push('/login')
  window.location.reload();
}

// request
axios.interceptors.request.use(
  (config) => {
    const token = store.get('token')
    if (!config.url.includes('login')) {
      config.headers.common['token'] = token;
    }
    if(config.url.includes('config/download')) {
      config.responseType = "blob"
    }
    if (config.method === 'get') {
      config.params = Object.assign(config.params || {});
    } else {
      config.data = Object.assign(config.params || {});
      delete config.params;
    }
    return config;
  }, (error) => {
    console.log(error);
    return Promise.reject(error);
  });

// response
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.log(error);
  return Promise.reject(error);
});

export default function request(options) {
  const { url , method, data, all=false } = options
  return new Promise((resolve, reject) => {
    return axios({
      url,
      method,
      params: data
    }).then((response) => {
      if (all) {
        resolve(response)
      } else {
        if (response.status === 200) {
          resolve(response.data)
          if (response.data.code === 7001 || response.data.code === 7012) {
            logout()
          }
        } else {
          message.error(response.message || '系统错误！')
        }
      }
      
    }).catch((error) => {//错误业务逻辑
      message.error(error.message || '系统错误！')
    });
  });
}