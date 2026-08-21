import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { TOKEN_KEY } from '@/constants'

import platformRoutes from './modules/platform'
import messageRoutes from './modules/message'
import searchRoutes from './modules/search'
import spaceRoutes from './modules/space'
import accountRoutes from './modules/account'

const Index = () => import('@/views/IndexVue.vue')
const NotFound = () => import('@/views/NotFound.vue')

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '' },
  {
    path: '',
    name: 'index',
    component: Index,
    meta: { requestAuth: false },
  },
  {
    path: '/video/:vid',
    component: () => import('@/views/detail/VideoDetail.vue'),
    meta: { requestAuth: false },
  },
  ...platformRoutes,
  ...messageRoutes,
  ...searchRoutes,
  ...spaceRoutes,
  ...accountRoutes,
  { path: '/:catchAll(.*)', name: 'notfound', component: NotFound, meta: { requestAuth: false } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  if (to.meta.requestAuth && !localStorage.getItem(TOKEN_KEY)) {
    next({ name: 'index' })
  } else {
    next()
  }
})

export default router
