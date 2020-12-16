import request from './request'

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
