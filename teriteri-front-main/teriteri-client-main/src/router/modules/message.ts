import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/message',
    redirect: '/message/reply',
    component: () => import('@/views/message/MessageView.vue'),
    children: [
      { path: 'reply', component: () => import('@/views/message/children/MessageReply.vue'), meta: { requestAuth: true } },
      { path: 'at', component: () => import('@/views/message/children/MessageAt.vue'), meta: { requestAuth: true } },
      { path: 'love', component: () => import('@/views/message/children/MessageLove.vue'), meta: { requestAuth: true } },
      { path: 'system', component: () => import('@/views/message/children/MessageSystem.vue'), meta: { requestAuth: true } },
      {
        path: 'whisper', component: () => import('@/views/message/children/MessageWhisper.vue'), meta: { requestAuth: true },
        children: [
          { path: ':mid', component: () => import('@/views/message/children/children/WhisperDialog.vue'), meta: { requestAuth: true } },
        ],
      },
      { path: 'config', component: () => import('@/views/message/children/MessageConfig.vue'), meta: { requestAuth: true } },
    ],
  },
]

export default routes
