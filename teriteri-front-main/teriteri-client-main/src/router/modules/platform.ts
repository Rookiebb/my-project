import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/platform',
    redirect: '/platform/home',
    component: () => import('@/views/platform/PlatformView.vue'),
    children: [
      { path: 'home', component: () => import('@/views/platform/children/PlatformHome.vue'), meta: { requestAuth: true } },
      {
        path: 'upload',
        component: () => import('@/views/platform/children/PlatformUpload.vue'),
        redirect: '/platform/upload/video',
        children: [
          { path: 'video', component: () => import('@/views/platform/children/uploadChildren/VideoUpload.vue'), meta: { requestAuth: true } },
          { path: 'text', component: () => import('@/views/platform/children/uploadChildren/TextUpload.vue'), meta: { requestAuth: true } },
        ],
      },
      { path: 'upload-manager/manuscript', component: () => import('@/views/platform/children/PlatformManuscript.vue'), meta: { requestAuth: true } },
      { path: 'upload-manager/appeal', component: () => import('@/views/platform/children/PlatformAppeal.vue'), meta: { requestAuth: true } },
      { path: 'data-up', component: () => import('@/views/platform/children/PlatformData.vue'), meta: { requestAuth: true } },
      { path: 'comment', component: () => import('@/views/platform/children/PlatformComment.vue'), meta: { requestAuth: true } },
      { path: 'danmu', component: () => import('@/views/platform/children/PlatformDanmu.vue'), meta: { requestAuth: true } },
    ],
  },
]

export default routes
