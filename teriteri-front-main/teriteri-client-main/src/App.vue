<template>
  <div id="app">
    <router-view></router-view>
    <div class="loading-mark" :class="isMarkShow ? 'show' : 'hide'" :style="`display: ${markDisplay};`">
      <div class="loading-box">
        <img src="~assets/img/loading.gif" alt="">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore, useUserStore, useMessageStore, useChatStore } from '@/stores'
import { get } from '@/network'
import { TOKEN_KEY } from '@/constants'

const appStore = useAppStore()
const userStore = useUserStore()
const msgStore = useMessageStore()
const chatStore = useChatStore()
const { isLoading } = storeToRefs(appStore)

const markDisplay = ref('none')
const isMarkShow = ref(false)

function show() { markDisplay.value = ''; isMarkShow.value = true }
function hide() { isMarkShow.value = false; setTimeout(() => { markDisplay.value = 'none' }, 200) }

async function fetchChannels() {
  const res = await get<any[]>('/category/getall')
  appStore.setChannels(res.data)
}

async function fetchTrendings() {
  const res = await get<any[]>('/search/hot/get')
  appStore.setTrendings(res.data)
}

async function initIMServer() {
  await chatStore.connectWebSocket()
  if (chatStore.ws) {
    const connection = JSON.stringify({
      code: 100,
      content: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    })
    chatStore.ws.send(connection)
  }
}

onMounted(async () => {
  fetchChannels()
  fetchTrendings()
  if (localStorage.getItem(TOKEN_KEY)) {
    await userStore.fetchPersonalInfo()
  }
  if (localStorage.getItem(TOKEN_KEY)) {
    msgStore.fetchMsgUnread()
    await initIMServer()
    await userStore.fetchFavorites(userStore.uid)
    await userStore.fetchLikeAndDislike(userStore.uid)
  }
  window.addEventListener('beforeunload', () => chatStore.closeWebSocket())
})

onBeforeUnmount(async () => {
  await chatStore.closeWebSocket()
  window.removeEventListener('beforeunload', () => chatStore.closeWebSocket())
})

watch(isLoading, (val) => { val ? show() : hide() })
</script>

<style>
#app {
    margin: 0 auto;
    max-width: 2560px;
    background-color: var(--bg1);
}

.loading-mark {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50000;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.loading-box {
    display: flex;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
}

.loading-box img {
    max-height: 33vh;
    max-width: 33vw;
}

.hide {
    animation: fade-out 0.2s ease-out forwards;
}

.show {
    animation: fade-in 0.2s ease-out forwards;
}

@keyframes fade-in {
    0% { opacity: 0; }
    100% { opacity: 1; }
}

@keyframes fade-out {
    0% { opacity: 1; }
    100% { opacity: 0; }
}
</style>
