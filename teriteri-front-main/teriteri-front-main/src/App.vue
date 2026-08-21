<template>
  <div id="app">
    <router-view></router-view>
    <div class="loading-mask" :class="isMaskShow ? 'show' : 'hide'" :style="`display: ${maskDisplay};`">
      <div class="loading-box">
        <img src="~assets/img/loading.gif" alt="">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore, useUserStore } from '@/stores'
import { get } from '@/network'
import { TOKEN_KEY } from '@/constants'

const appStore = useAppStore()
const userStore = useUserStore()
const { isLoading } = storeToRefs(appStore)

const maskDisplay = ref('none')
const isMaskShow = ref(false)

function show() {
  maskDisplay.value = ''
  isMaskShow.value = true
}
function hide() {
  isMaskShow.value = false
  setTimeout(() => { maskDisplay.value = 'none' }, 200)
}

async function fetchChannels() {
  const res = await get<any[]>('/category/getall')
  appStore.setChannels(res.data)
}

onMounted(() => {
  if (localStorage.getItem(TOKEN_KEY)) {
    userStore.fetchPersonalInfo()
  }
  fetchChannels()
})

watch(isLoading, (val) => {
  val ? show() : hide()
})
</script>

<style>
#app {
    margin: 0 auto;
    background-color: var(--bg1);
}

.loading-mask {
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

/* 淡入动画 */
@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

/* 淡出动画 */
@keyframes fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>
