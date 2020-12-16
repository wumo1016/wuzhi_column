import request from './request'

// 获取专栏列表
export const getColumns = (params = null) =>
  request({
    url: '/columns',
    method: 'get',
    params
  })

export function Post(url: string, data = null) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function Delete(url: string, params = null) {
  return request({
    url,
    method: 'delete',
    params
  })
}

export function Put(url: string, data = null) {
  return request({
    url,
    method: 'put',
    data
  })
}

export function Get(url: string, params = null) {
  return request({
    url,
    method: 'get',
    params
  })
}
