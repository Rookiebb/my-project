import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { TOKEN_KEY } from '@/constants'

import homeRoutes from './modules/home'
import contentRoutes from './modules/content'
import reviewRoutes from './modules/review'
import caseRoutes from './modules/case'
import systemRoutes from './modules/system'

const AdminLayout = () => import('@/layouts/AdminLayout.vue')
const NotFound = () => import('@/views/NotFound.vue')
const Login = () => import('@/views/LoginVue.vue')

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/home' },
  {
    path: '',
    redirect: '/home',
    component: AdminLayout,
    meta: { requestAuth: true },
    children: [
      ...homeRoutes,
      ...contentRoutes,
      ...reviewRoutes,
      ...caseRoutes,
      ...systemRoutes,
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { requestAuth: false },
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
    meta: { requestAuth: false },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  if (to.meta.requestAuth && !localStorage.getItem(TOKEN_KEY)) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
