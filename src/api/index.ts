import request from './request'

// 获取专栏列表
export const getColumnList = () =>
  request({
    url: '/columns',
    method: 'get'
  })
// 获取专栏信息
export const getColumnInfo = (id: string) =>
  request({
    url: `/columns/${id}`,
    method: 'get'
  })

// 获取专栏文章列表
export const getArticleList = (id: string) =>
  request({
    url: `/columns/${id}/posts`,
    method: 'get'
  })
// 登录
export const login = data =>
  request({
    url: `/user/login`,
    method: 'post',
    data
  })
// 获取用户信息
export const getUserInfo = () =>
  request({
    url: `/user/current`,
    method: 'get'
  })
// 注册
export const register = data =>
  request({
    url: `/users`,
    method: 'post',
    data
  })
// 新建文章
export const createArticle = data =>
  request({
    url: `/posts`,
    method: 'post',
    data
  })
// 获取当前文章信息
export const getArticleInfo = id =>
  request({
    url: `/posts/${id}`,
    method: 'get'
  })
