import axios from 'axios'

axios.defaults.baseURL = 'http://apis.imooc.com/api/'

axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: '0BC9ABB4AD85B874' }
  return config
})

axios.interceptors.response.use(response => {
  return response
})

axios.get('/columns?currentPage=1&pageSize=5')

export default axios
