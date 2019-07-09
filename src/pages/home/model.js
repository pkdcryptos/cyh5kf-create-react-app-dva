import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import api from 'services'

const { 
  addColumn,
  queryColumn,
  query,
  addReport,
  deleteReport,
  updateReport,
 } = api

 export default modelExtend(pageModel, {
  namespace: "home",

  state: {
    uploadModalVisible: false,
    addIndicatorModalVisible: false,
    addFieldModalVisible: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/home', location.pathname)) {
          // const payload = location.query || { currentPage: 1, pageSize: 10 }
          // dispatch({
          //   type: 'queryColumn',
          // })

          // dispatch({
          //   type: 'query',
          //   payload,
          // })

        }
      })
    },
  },

  effects: {

    *query({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data.code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            list: data.data.result,
            pagination: {
              current: Number(payload.currentPage) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.total,
            },
          },
        })
      } else {
        throw data
      }
    },

    *queryColumn({ payload = {} }, { call, put }) {
      const data = yield call(queryColumn)
      if (data.code === 200) {
        yield put({
          type: 'updateState',
          payload: {
            columnList: data.data,
          },
        })
      } else {
        throw data
      }
    },

    *addColumn({ payload }, { call, put }) {
      const data = yield call(addColumn, payload)
      if (data.code === 200) {
        message.success("新增字段成功！")
        yield put({ type: 'hideFieldModal' })
      } else {
        throw data
      }
    },

    *addReport({ payload }, { call, put }) {
      const data = yield call(addReport, payload)
      if (data.code === 200) {
        message.success("新增指标成功！")
        yield put({ type: 'hideIndicatorModal' })
      } else {
        throw data
      }
    },

    *delete({ payload }, { call, put }) {
      const data = yield call(deleteReport, '', payload.id)
      if (data.code === 200) {
        message.success("删除成功！")
      } else {
        throw data
      }
    },

    *update({ payload }, { call, put }) {
      const data = yield call(updateReport, payload)
      if (data.code === 200) {
        message.success("更新指标成功！")
      } else {
        throw data
      }
    },

  },

  reducers: {
    showUploadModal(state, { payload }) {
      return { ...state, ...payload, uploadModalVisible: true };
    },

    hideUploadModal(state) {
      return { ...state, uploadModalVisible: false };
    },

    showIndicatorModal(state, { payload }) {
      return { ...state, ...payload, addIndicatorModalVisible: true };
    },

    hideIndicatorModal(state) {
      return { ...state, addIndicatorModalVisible: false };
    },

    showFieldModal(state, { payload }) {
      return { ...state, ...payload, addFieldModalVisible: true };
    },

    hideFieldModal(state) {
      return { ...state, addFieldModalVisible: false };
    }
  }

 })
