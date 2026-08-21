import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/search',
    component: () => import('@/views/search/SearchView.vue'),
    meta: { requestAuth: false },
    props: (route: any) => ({ keyword: route.query.keyword }),
    children: [
      { path: 'video', component: () => import('@/views/search/children/SearchVideo.vue'), meta: { requestAuth: false }, props: (route: any) => ({ keyword: route.query.keyword }) },
      { path: 'user', component: () => import('@/views/search/children/SearchUser.vue'), meta: { requestAuth: false }, props: (route: any) => ({ keyword: route.query.keyword }) },
    ],
  },
]

export default routes
