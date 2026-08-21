import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/content',
    redirect: '/content/carousel',
    children: [
      {
        path: 'carousel',
        component: () => import('@/views/content/CarouselManage.vue'),
        meta: { requestAuth: true },
      },
      {
        path: 'hot-search',
        component: () => import('@/views/content/HotSearchManage.vue'),
        meta: { requestAuth: true },
      },
      {
        path: 'ranking',
        component: () => import('@/views/content/RankingManage.vue'),
        meta: { requestAuth: true },
      },
      {
        path: 'tag',
        component: () => import('@/views/content/TagManage.vue'),
        meta: { requestAuth: true },
      },
    ],
  },
]

export default routes
