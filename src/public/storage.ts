// 设置token
const tokenField = 'token'
export const setLocalToken = (data: string) => {
  localStorage.setItem(tokenField, data)
}
export const getLocalToken = () => {
  return localStorage.getItem(tokenField)
}
export const removeLocalToken = () => {
  localStorage.removeItem(tokenField)
}
// 设置用户信息
const userInfoField = 'userInfo'
export const setLocalUserInfo = (data: null) => {
  localStorage.setItem(userInfoField, JSON.stringify(data))
}
export const getLocalUserInfo = () => {
  const userInfo = localStorage.getItem(userInfoField)
  return userInfo ? JSON.parse(userInfo) : null
}
export const removeLocalUserInfo = () => {
  localStorage.removeItem(userInfoField)
}

// 清除缓存
export const clearStorage = () => {
  removeLocalToken()
  removeLocalUserInfo()
}
