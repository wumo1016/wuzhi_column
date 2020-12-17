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
export const login = (data: null) =>
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
