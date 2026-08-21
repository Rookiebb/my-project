import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Channel } from '@/types'

export const useAppStore = defineStore('app', () => {
  const isLoading = ref(false)
  const channels = ref<Channel[]>([])

  function setLoading(val: boolean) {
    isLoading.value = val
  }

  function setChannels(list: Channel[]) {
    channels.value = list
  }

  return { isLoading, channels, setLoading, setChannels }
})
