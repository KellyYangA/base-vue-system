import conn from './conn'
const request = (method, url, data = {}) => {
  return conn.request({method, url, data}).then(data => ({data})).catch(err => ({err}))
}

export default {
  user: params => request('get', `/main/auth/api/userInfo`, params)
}
