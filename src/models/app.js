import store from 'store'
import { routerRedux } from 'dva/router';
import { message } from 'antd'
import api from 'services'

const { 
  // loginOut,
  updateUserPwd
 } = api

export default {
  namespace: "app",

  state: {
    isLogin: store.get('isLogin') || false, // 登录状态
    collapsed: store.get('collapsed') || false,
    updatePwdModalVisible: false, // 修改密码弹窗状态
    notifications: [
      {
        title: 'New User is registered.',
        date: new Date(Date.now() - 10000000),
      },
      {
        title: 'Application has been approved.',
        date: new Date(Date.now() - 50000000),
      },
    ],
  },

  subscriptions: {
  },

  effects: {
    *signOut({ payload }, { call, put }) {
      // const userInfo = store.get('userInfo')
      // const data = yield call(loginOut, '', userInfo.id)
      // if (data.code === 200) {
        store.set('token', '')
        store.set('userInfo', {})
        store.set('isLogin', false)
        yield put(routerRedux.push('/login'));
        window.location.reload();
      // }
    },

    *updateUserPwd({ payload }, { call, put }) {
      const data = yield call(updateUserPwd, payload)
      if (data.code === 200) {
        message.success("修改密码成功！")
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload)
      return {
        ...state,
        collapsed: payload
      }
    },
    allNotificationsRead(state) {
      return {
        ...state,
        notifications: []
      }
    },
    checkIsLogin(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    showModal(state, { payload }) {
      return { ...state, updatePwdModalVisible: true }
    },

    hideModal(state) {
      return { ...state, updatePwdModalVisible: false }
    },
  }
};
