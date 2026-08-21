import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/case',
    redirect: '/case/report',
    children: [
      {
        path: 'report',
        component: () => import('@/views/case/ReportCase.vue'),
        meta: { requestAuth: true },
      },
      {
        path: 'appeal',
        component: () => import('@/views/case/AppealCase.vue'),
        meta: { requestAuth: true },
      },
    ],
  },
]

export default routes
