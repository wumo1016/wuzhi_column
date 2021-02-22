import axios from 'axios'
import store from '@/store'
import * as types from '@/store/action-types'
import { getLocalToken } from '@/public/storage'
import createMessage from '@/public/createMessage'

axios.defaults.baseURL = 'http://apis.imooc.com/api/'

axios.interceptors.request.use(
  config => {
    store.commit(types.SET_LOADING, true)
    config.headers['Authorization'] = `Bearer ${getLocalToken()}`
    const code = 'A604E42F8587A97E'
    if (config.data instanceof FormData) {
      config.data.append('icode', code)
      config.headers['Content-Type'] = 'multipart/form-data'
    } else if (config.method === 'post' || config.method === 'patch') {
      config.data = { ...config.data, icode: code }
    } else {
      config.params = { ...config.params, icode: code }
    }
    return config
  },
  e => {
    store.commit(types.SET_LOADING, false)
    return Promise.reject(e)
  }
)

axios.interceptors.response.use(
  response => {
    store.commit(types.SET_LOADING, false)
    if (response.data && response.data.code === 0) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  e => {
    const { error } = e.response.data
    createMessage({
      type: 'error',
      message: error
    })
    store.commit(types.SET_LOADING, false)
    return Promise.reject(e)
  }
)

export default axios
