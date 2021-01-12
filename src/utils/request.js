import httpFetch from './http'
// const api_key = '233d4cad34c34d343785s34dw3er3ds3234esd4'
// let sign = process.env.VUE_APP_SIGN

// if (process.env.NODE_ENV === 'production') {
//   sign = localStorage.getItem("sign")
// } else {
//   sign = '17a1920fdc3c3c25d1bf7c6dd724f5cf'
// }

/**
 * 获取服务端数据
 * @param method        请求类型
 * @param name          uri名称
 * @param queryParams   QueryString参数
 * @param contentType   contentType参数
 * @returns {*}
 */
const httpData = (method, name, {
  queryParams = {},
  contentType = ''
} = {}) => {
  console.log('entry');
  let url = ''
  try {
      url = name
      console.log(url);
      console.log(httpFetch);
  } catch (err) {
      return Promise.reject(err)
  }
  return httpFetch(method, url, queryParams, contentType)
}
export default httpData
