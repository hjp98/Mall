<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  HomeFilled,
  ShoppingBag,
  Goods,
  PriceTag,
  Setting,
  User,
  CaretBottom
} from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { menuStore } from '@/store/menu'
import { userStore } from './store/user'

const route = useRoute()
const router = useRouter()
const user = userStore()

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}

const changeLabel = function () {
  isCollapse.value = !isCollapse.value
}
const out = function () {
  user.user.Authorization = ''
  console.log(user.user.Authorization)
  router.push({ path: '/login' })
}

const store: any = menuStore()

const address = computed(() => {
  let a = route.path.split('/')
  let b1: any = a[1]
  let b2: any = a[2]
  let address1 = store.menu[b1]
  let address2 = store.menu[b2]
  let c: any = {
    address1: address1,
    address2: address2,
    path: route.path
  }
  console.log(c.path)
  return c
})

// let activeIndex = ref()
// watch(route, () => {
//   handleSelect(activeIndex.value)
// })

const handleSelect = function (index: any) {
  // activeIndex.value = index
}
</script>

<template>
  <div>
    <div class="box">
      <div class="box_left" v-if="$route.path !== '/login' && $route.path !== '/register'">
        <el-menu
          :default-active="address.path"
          :router="true"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
        >
          <el-menu-item
            index="/"
            id="index"
            @click="$router.push({ path: '/' })"
            :style="address.path === '/' ? 'color: #409eff;' : ''"
          >
            <el-icon><HomeFilled /></el-icon>
            <template #title>首页</template>
          </el-menu-item>
          <el-sub-menu index="/commodity">
            <template #title>
              <el-icon><ShoppingBag /></el-icon>
              <span>商品</span>
            </template>
            <el-menu-item
              index="/commodity/goods"
              :style="address.path === '/commodity/goods' ? 'color: #409eff;' : ''"
              >商品列表</el-menu-item
            >
            <el-menu-item index="2-2">添加商品</el-menu-item>
            <el-menu-item index="2-3">商品分类</el-menu-item>
            <el-menu-item index="2-4">商品类型</el-menu-item>
            <el-menu-item index="2-5">品牌管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Goods /></el-icon>
              <span>订单</span>
            </template>
            <el-menu-item index="3-1">订单列表</el-menu-item>
            <el-menu-item index="3-2">订单设置</el-menu-item>
            <el-menu-item index="3-3">退货申请处理</el-menu-item>
            <el-menu-item index="3-4">退货原因设置</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><PriceTag /></el-icon>
              <span>营销</span>
            </template>
            <el-menu-item index="4-1">秒杀活动列表</el-menu-item>
            <el-menu-item index="4-2">优惠劵列表</el-menu-item>
            <el-menu-item index="4-3">品牌推荐</el-menu-item>
            <el-menu-item index="4-4">新品推荐</el-menu-item>
            <el-menu-item index="4-5">人气推荐</el-menu-item>
            <el-menu-item index="4-6">专题推荐</el-menu-item>
            <el-menu-item index="4-7">广告列表</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>权限</span>
            </template>
            <el-menu-item index="5-1">用户列表</el-menu-item>
            <el-menu-item index="5-2">角色列表</el-menu-item>
            <el-menu-item index="5-3">菜单列表</el-menu-item>
            <el-menu-item index="5-4">资源列表</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>

      <div style="width: 100%">
        <div
          :class="isCollapse ? 'top_box' : 'box_top'"
          v-if="$route.path !== '/login' && $route.path !== '/register'"
        >
          <div class="top">
            <el-radio-group v-model="isCollapse">
              <div @click="changeLabel" :class="isCollapse ? 'top_btn' : ''">
                <svg
                  data-v-38e027bb=""
                  t="1492500959545"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1691"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="20"
                  height="20"
                  class="pic"
                >
                  <path
                    data-v-38e027bb=""
                    d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"
                    p-id="1692"
                  ></path>
                  <path
                    data-v-38e027bb=""
                    d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"
                    p-id="1693"
                  ></path>
                  <path
                    data-v-38e027bb=""
                    d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"
                    p-id="1694"
                  ></path>
                </svg>
              </div>
            </el-radio-group>
            <div class="nav">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="address.path" v-if="address.address1 !== undefined">{{
                  address.address1
                }}</el-breadcrumb-item>
                <el-breadcrumb-item v-if="address.address1 !== undefined">{{
                  address.address2
                }}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </div>
          <div class="out">
            <div>
              <el-icon><User /></el-icon>
            </div>
            <div class="out_btn">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <el-icon><CaretBottom /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>首页</el-dropdown-item>
                    <el-dropdown-item @click="out">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.box {
  display: flex;
  color: #bfcbd9;
  .box_left {
    // background-color: #304156;
    position: fixed;
    .el-menu-vertical-demo {
      background-color: #304156;
      color: #bfcbd9;
      height: 100vh;
      #index {
        background-color: #304156;
        color: #bfcbd9;
        :hover {
          background-color: #001528;
          opacity: 0.6;
        }
      }
      .el-sub-menu {
        :hover {
          background-color: #001528 !important;
          // opacity: 0.6;
        }
        :deep(.el-sub-menu__title) {
          color: #bfcbd9 !important;
        }
        .el-menu-item {
          background-color: #1f2d3d;
          color: #bfcbd9;
        }
      }
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 180px;
      min-height: 400px;
    }
  }
  .top_box {
    line-height: 50px;
    height: 50px;
    // width: 100%;
    padding: 5px;
    margin-left: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    .top {
      display: flex;
      align-items: center;
    }
    .el-radio-group {
      padding-top: 20px;
      .top_btn {
        display: inherit;
        transform: rotate(90deg);
        transition: 0.1s;
        padding-right: 20px;
      }
    }
    .nav {
      margin-left: 10px;
    }
    .out {
      display: flex;
      align-items: center;
      .out_btn {
        padding-top: 35px;
      }
    }
  }
  .box_top {
    line-height: 50px;
    height: 50px;
    // width: 100%;
    padding: 5px;
    margin-left: 190px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    .top {
      display: flex;
      align-items: center;
    }
    .el-radio-group {
      padding-top: 20px;
      .top_btn {
        display: inherit;
        transform: rotate(90deg);
        transition: 0.1s;
        padding-right: 20px;
      }
    }
    .nav {
      margin-left: 10px;
    }
    .out {
      display: flex;
      align-items: center;
      .out_btn {
        padding-top: 35px;
      }
    }
  }
}
</style>
