import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import router from './router'
import { useChatStore, useMessageStore, useUserStore } from './stores'
import { TOKEN_KEY } from './constants'

import './assets/css/base.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(ElementPlus, { locale: zhCn })

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 监听 auth:logout 事件（由 network 拦截器触发）
window.addEventListener('auth:logout', () => {
  const userStore = useUserStore()
  const chatStore = useChatStore()
  const msgStore = useMessageStore()

  userStore.initData()
  chatStore.closeWebSocket()
  msgStore.resetUnread()
  localStorage.removeItem(TOKEN_KEY)
})

app.mount('#app')
