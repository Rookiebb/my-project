import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/system',
    redirect: '/system/user',
    children: [
      {
        path: 'user',
        component: () => import('@/views/system/UserManage.vue'),
        meta: { requestAuth: true },
      },
      {
        path: 'role',
        component: () => import('@/views/system/RoleManage.vue'),
        meta: { requestAuth: true },
      },
    ],
  },
]

export default routes
