import axios from 'axios'
import store from '../components/index/global/vuex'

let proxyPrefix = ''
if (process.env.NODE_ENV === 'production') {
  if (process.env.VUE_APP_TITLE === 'alpha') {
    proxyPrefix = ''      // 测试环境
  } else {
    proxyPrefix = ''      // 生产环境
  }
} else {
  proxyPrefix = '/proxy'    // 开发环境
}

export const baseConfig = {
  baseURL: proxyPrefix,
  withCredentials: false,
  timeout: 45000// 请求超时时间
}

function obj2queryStr (obj, prefix = '?', delimiter = '&') {
  return prefix + Object.keys(obj).filter(key => !!obj[key]).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])).join(delimiter)
}
// 创建一个axios实例
const axiosInstance = axios.create(baseConfig)

// 注册请求拦截器
axiosInstance.interceptors.request.use(requestFilter, err => {
  return Promise.reject(err)
})
export function requestFilter(config) {
  // 从请求参数里面取出一些控制参数, 控制loading的显示
  const { _loading, _hideGlobalError, ...data } = config.data
  config.headers._loading = _loading !== false
  config.headers._hideGlobalError = _hideGlobalError
  if (config.method === 'get') {
    let query = Object.assign({}, {
      _t: new Date().getTime()
    })
    config.url = config.url + obj2queryStr(query)
    config.params = data
  } else {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
  }
  if (config.headers._loading !== false) {
    store.commit('showLoading', {_loading, 'count': true})
  }
  return config
}

// 注册响应拦截器
axiosInstance.interceptors.response.use(responseFilter, errorHandler)
export function responseFilter (response) {
  // 从请求参数里面取出一些控制参数, 控制loading的显示,err的处理
  let { _loading } = response.config.headers
  if (_loading) {
    store.commit('hideLoading', {'count': true})
  }
  console.log('response',response)
  // 接口返回失败的时候
  if (response.data) {
    const err = response.data
    // 将异常信息reject
    return Promise.reject(err)
  } else {
    // 接口返回成功的时候，将返回数据resolve
    return Promise.resolve(response.data)
  }
}

export function errorHandler(error) {
  // 这里是服务端的异常，如404，500等
  try {
    const { _loading, _hideGlobalError } = error.response.config.headers
    if (_loading) {
      store.commit('hideLoading', {'count': false})
    }
    // 默认情况下，此处统一提示服务端的错误信息，除非请求的时候设置了_hideGlobalError为true
    if (!_hideGlobalError) {
      error(error.message)
      if (error.response.status === 401) {
        location.href = 'login.html'
      } else if (error.response.status === 400) {
        error('参数错误')
      } else if (error.response.status === 404) {
        error('没有找到相应资源')
      } else if (error.response.status === 500) {
        error('服务器异常')
      }
    }
  } catch (e) {
    store.commit('hideLoading', {'count': false})
  }
  // 将异常信息reject
  return Promise.reject(error)
}
export default axiosInstance
