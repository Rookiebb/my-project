import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/review',
    redirect: '/review/video',
    children: [
      {
        path: 'video',
        redirect: '/review/video/form',
        children: [
          {
            path: 'form',
            component: () => import('@/views/review/VideoReview.vue'),
            meta: { requestAuth: true },
          },
          {
            path: 'detail/:vid',
            name: 'videoDetail',
            component: () => import('@/views/review/detail/VideoDetail.vue'),
            meta: { requestAuth: true },
          },
        ],
      },
      {
        path: 'article',
        component: () => import('@/views/review/ArticleReview.vue'),
        meta: { requestAuth: true },
      },
      {
        path: 'avatar',
        component: () => import('@/views/review/AvatarReview.vue'),
        meta: { requestAuth: true },
      },
      {
        path: 'dynamic',
        component: () => import('@/views/review/DynamicReview.vue'),
        meta: { requestAuth: true },
      },
      {
        path: 'comment',
        component: () => import('@/views/review/CommentReview.vue'),
        meta: { requestAuth: true },
      },
      {
        path: 'danmu',
        component: () => import('@/views/review/DanmuReview.vue'),
        meta: { requestAuth: true },
      },
    ],
  },
]

export default routes
