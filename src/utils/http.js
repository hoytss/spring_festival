import axios from 'axios';
// import qs from "qs";
import {
  Dialog
} from "vant";

// 配置请求头
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例 
const http = axios.create({
  // baseURL:'http://10.10.12.185:5000',//接口统一域名
  timeout: 18000  //设置超时
})
// 请求拦截器 忽略
http.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 响应拦截器 忽略
http.interceptors.response.use(
  response => {
    if (response.status == 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    return Promise.reject(
      Dialog.alert({
        title: "提示",
        message: error || "网络请求失败，请刷新重试"
      })
    );
  }
);

const httpFetch = (method, url, queryParams = {}, contentType) => {
  axios.defaults.headers["Content-Type"] = contentType;
  return new Promise((resolve, reject) => {
    switch (method) {
      case 'get': {
        http.get(url, {
          params: queryParams
        })
          .then((res) => {
            resolve(res.data)
          })
          .catch((e) => {
            reject(e)
          })
        break
      }
      case 'getBlob': {
        http.get(url, {
          params: queryParams
        }, { responseType: 'blob' })
          .then((res) => {
            resolve(res)
          })
          .catch((e) => {
            reject(e)
          })
        break
      }
      case 'getBuffer': {
        http.get(url, {
          params: queryParams,
          responseType: 'arraybuffer'
        })
          .then((res) => {
            resolve(res)
          })
          .catch((e) => {
            reject(e)
          })
        break
      }
      case 'delete': {
        http.delete(url, {
          data: queryParams
        })
          .then((res) => {
            resolve(res.data)
          })
          .catch((e) => {
            reject(e)
          })
        break
      }
      case 'head': {
        http.head(url, {
          params: queryParams
        })
          .then((res) => {
            resolve(res.data)
          })
          .catch((e) => {
            reject(e)
          })
        break
      }
      case 'post': {
        http.post(url, queryParams)
          .then((res) => {
            resolve(res.data)
          })
          .catch((e) => {
            console.log('duia1212 ');
            reject(e)
          })
        break
      }
      case 'put': {
        http.put(url, queryParams)
          .then((res) => {
            resolve(res.data)
          })
          .catch((e) => {
            reject(e)
          })
        break
      }
      case 'patch': {
        http.patch(url, queryParams)
          .then((res) => {
            resolve(res.data)
          })
          .catch((e) => {
            reject(e)
          })
        break
      }
    }
  }).catch((e) => { console.error(e); })
}


export default httpFetch
// export default {
//   post(url, data) {
//     return new Promise((resolve, reject) => {
//       axios({
//           method: 'post',
//           url,
//           data: qs.stringify(data),
//         })
//         .then(res => {
//           resolve(res.data)
//         })
//         .catch(err => {
//           reject(err)
//         });
//     })
//   },

//   get(url, data) {
//     return new Promise((resolve, reject) => {
//       axios({
//           method: 'get',
//           url,
//           params: data,
//         })
//         .then(res => {
//           resolve(res.data)
//         })
//         .catch(err => {
//           reject(err)
//         })
//     })
//   }
// };

