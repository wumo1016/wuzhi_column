import axios from 'axios'

axios.defaults.baseURL = 'http://apis.imooc.com/api/'

axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: '0BC9ABB4AD85B874' }
  return config
})

axios.interceptors.response.use(response => {
  if (response.data && response.data.code === 0) {
    return Promise.resolve(response.data.data)
  } else {
    return Promise.reject(response)
  }
})

export default axios
