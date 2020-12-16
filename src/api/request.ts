import axios from 'axios'
import store from '@/store'
import * as types from '@/store/action-types'

axios.defaults.baseURL = 'http://apis.imooc.com/api/'

axios.interceptors.request.use(config => {
  store.commit(types.SET_LOADING, true)
  config.params = { ...config.params, icode: '0BC9ABB4AD85B874' }
  return config
})

axios.interceptors.response.use(response => {
  store.commit(types.SET_LOADING, false)
  if (response.data && response.data.code === 0) {
    return Promise.resolve(response.data.data)
  } else {
    return Promise.reject(response)
  }
})

export default axios
