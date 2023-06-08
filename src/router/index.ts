import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../views/home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/register.vue')
  },
  {
    path: '/commodity',
    name: 'commodity',
    // component: () => import(/* webpackChunkName: "about" */ '../views/commodity/index.vue'),
    children: [
      {
        path: 'goods',
        name: 'goods',
        component: () => import('../views/commodity/index.vue')
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('../views/commodity/add.vue')
      },
      {
        path: 'goodsType',
        name: 'goodsType',
        component: () => import('../views/commodity/goodsType/index.vue')
      },
      {
        path: 'addType',
        name: 'addType',
        component: () => import('../views/commodity/goodsType/addType.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
