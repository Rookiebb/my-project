import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/account',
    redirect: '/account/home',
    component: () => import('@/views/account/AccountView.vue'),
    meta: { requestAuth: true },
    children: [
      { path: 'home', component: () => import('@/views/account/children/AccountHome.vue'), meta: { requestAuth: true } },
      { path: 'info', component: () => import('@/views/account/children/AccountInfo.vue'), meta: { requestAuth: true } },
      { path: 'avatar', component: () => import('@/views/account/children/AccountAvatar.vue'), meta: { requestAuth: true } },
      { path: 'security', component: () => import('@/views/account/children/AccountSecurity.vue'), meta: { requestAuth: true } },
    ],
  },
]

export default routes
