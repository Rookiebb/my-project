import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/homePage/HomePage.vue'),
    meta: { requestAuth: true },
  },
  {
    path: '/data',
    name: 'Data',
    component: () => import('@/views/data/DataCenter.vue'),
    meta: { requestAuth: true },
  },
]

export default routes
