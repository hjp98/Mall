import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const menuStore = defineStore(
  'menu',
  () => {
    const menu = reactive({
      commodity: '商品',
      goods: '商品列表',
      add: '添加商品',
      goodsType: '商品分类',
      addType: '添加商品分类'
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
