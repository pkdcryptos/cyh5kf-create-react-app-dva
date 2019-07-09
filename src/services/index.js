import request from 'utils/request'
import { apiPrefix } from 'utils/config'

import api from './api'

const gen = params => {
  const env = process.env.NODE_ENV
  let url = env === 'development'? apiPrefix + params: params  // TODO: 开发环境要加前缀，生产环境去掉前缀
  let method = 'GET'

  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    method = paramsArray[0]
    url = env === 'development'? apiPrefix + paramsArray[1]: paramsArray[1]
  }

  return function(data, addUrl) {
    const bl = addUrl !== undefined && addUrl !== "" && addUrl !== null
    return request({
      url: bl? url + '/' + addUrl: url,
      data,
      method,
    })
  }
}

const APIFunction = {}
for (const key in api) {
  APIFunction[key] = gen(api[key])
}

export default APIFunction
