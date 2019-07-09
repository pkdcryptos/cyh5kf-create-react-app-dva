import store from 'store'
import { routerRedux } from 'dva/router';
import { message } from 'antd'
// import api from 'services'

// const { loginIn } = api

export default {
  namespace: 'login',

  state: {},

  subscriptions: {
  },

  effects: {
    *login({ payload }, { put, call, select }) {
      // const data = yield call(loginIn, payload)
      // if (data.code === 200) {
        message.success("登录成功！")
        // store.set('token', data.data.token)
        // store.set('userInfo', data.data)
        store.set('isLogin', true)
        yield put({ 
            type: 'app/checkIsLogin',
            payload: {
                isLogin: true,
            }
        })
        yield put(routerRedux.push('/home'));
      // } else {
        // throw data
      // }
    },
  },
}
