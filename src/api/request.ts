import axios from 'axios'
import store from '@/store'
import * as types from '@/store/action-types'
import { getLocalToken } from '@/public/storage'

axios.defaults.baseURL = 'http://apis.imooc.com/api/'

axios.interceptors.request.use(
  config => {
    store.commit(types.SET_LOADING, true)
    config.headers['Authorization'] = `Bearer ${getLocalToken()}`
    config.data = { ...config.data, icode: '0BC9ABB4AD85B874' }
    config.params = { ...config.params, icode: '0BC9ABB4AD85B874' }
    return config
  },
  err => {
    store.commit(types.SET_LOADING, false)
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  response => {
    store.commit(types.SET_LOADING, false)
    if (response.data && response.data.code === 0) {
      return Promise.resolve(response.data.data)
    } else {
      return Promise.reject(response)
    }
  },
  err => {
    store.commit(types.SET_LOADING, false)
    return Promise.reject(err)
  }
)

export default axios
