import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const menuStore = defineStore(
  'menu',
  () => {
    const menu = reactive({
      commodity: '商品',
      goods: '商品列表',
      add: '添加商品'
    })
    return { menu }
  },
  {
    persist: {
      key: 'menu',
      storage: localStorage
    }
  }
)
