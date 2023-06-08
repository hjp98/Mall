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
        'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImNyZWF0ZWQiOjE2ODYyMDk3MzYxNzYsImV4cCI6MTY4NjgxNDUzNn0.1QOTVrrKssMWjfRLZH6nvbFvwmBJ9Vb9oIqVJjp3pGasEutcdAPwJqn8CO6gZF-6edCo6NJzdTEA_Efw0gullQ'
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
