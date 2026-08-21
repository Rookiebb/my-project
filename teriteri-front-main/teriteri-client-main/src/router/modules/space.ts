import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/space',
    component: () => import('@/views/space/SpaceView.vue'),
    meta: { requestAuth: false },
    children: [
      { path: ':uid', component: () => import('@/views/space/children/SpaceHome.vue'), meta: { requestAuth: false } },
      { path: ':uid/video', component: () => import('@/views/space/children/SpaceVideo.vue'), meta: { requestAuth: false } },
      { path: ':uid/article', component: () => import('@/views/space/children/SpaceArticle.vue'), meta: { requestAuth: false } },
      { path: ':uid/dynamic', component: () => import('@/views/space/children/SpaceDynamic.vue'), meta: { requestAuth: false } },
      { path: ':uid/favlist', component: () => import('@/views/space/children/SpaceFavlist.vue'), meta: { requestAuth: false }, props: (route: any) => ({ fid: route.query.fid }) },
      { path: ':uid/setting', component: () => import('@/views/space/children/SpaceSetting.vue'), meta: { requestAuth: true } },
      { path: ':uid/fans/follow', component: () => import('@/views/space/children/SpaceFollow.vue'), meta: { requestAuth: false } },
      { path: ':uid/fans/fans', component: () => import('@/views/space/children/SpaceFans.vue'), meta: { requestAuth: false } },
    ],
  },
]

export default routes
