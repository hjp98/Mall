import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const userStore = defineStore(
  'admin',
  () => {
    const user = reactive({
      name: '',
      password: '',
      Authorization: ''
    })
    const login = function (val: any) {
      (user.name = val.name), (user.password = val.pass)
      tokenCreate();
      console.log('登录成功');
      
    }
    const tokenCreate = function () {
      let guid =
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2ODA0MDcwOTYxOTIsImV4cCI6MTY4MTAxMTg5Nn0.ilFXDdKXGpstCfyqLys9IJevtUFr6O_bSbATjJnDtinNB7DvuXoF7mokMwEBIMuEj-vmZWQD_PyEa57q0u9wuQ'
      // for (let i = 0; i <= 32; i++) {
      //   const n = Math.floor(Math.random() * 16.0).toString(16);
      //   guid += n;
      // }
      user.Authorization = guid
    }
    return { user, login, tokenCreate }
  },
  {
    persist: {
      key: 'admin',
      storage: localStorage
    }
  }
)
