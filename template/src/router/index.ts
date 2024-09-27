import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Index from '@/pages/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: Index
  }
]

const base = process.env.NODE_ENV === 'production' ? '/activity/<%= options.name %>/' : ''
const router = createRouter({
  history: process.env.NODE_ENV === 'production' ? createWebHistory(base) : createWebHashHistory(base),
  routes,
  scrollBehavior () {
    return { top: 0 }
  }
})

export default router
