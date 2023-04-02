import axios from 'axios'
import { userStore } from '@/store/user'
// import VueAxios from 'vue-axios'

// Vue.use(VueAxios, axios)

// const apiurl = import.meta.env.VITE_BASE_API; //不同环境下获取的api的地址

//2.创建axios 实例
const http = axios.create({
  //3.配置
  baseURL: 'https://admin-api.macrozheng.com/',
  headers: {
    Authorization: "Bearer " + userStore().user.Authorization,
  },
  timeout: 10 * 60 * 1000 //1分钟
})


/**
 * 请求拦截
 */
// axios.interceptors.request.use(
//   (config) => {
//     if (store.user.Authorization != null && store.user.Authorization != '') {
//       // 请求头的 Authorization 加上 token 数据
//       config.headers.Authorization = store.user.Authorization
//     } else {
//       console.log('no token')
//     }
//     return config
//   },
//   (error) => {
//     console.log('error in request')
//     return Promise.reject(error)
//   }
// )

export default http
