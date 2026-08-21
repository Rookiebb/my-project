import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDanmuList, getVideoAttitude } from '@/api'
import type { DanmuItem } from '@/types'

export const useVideoStore = defineStore('video', () => {
  const danmuList = ref<DanmuItem[]>([])
  const attitudeToVideo = ref<any>({})

  async function fetchDanmuList(vid: number) {
    try {
      const res = await getDanmuList(vid)
      if (res.data) danmuList.value = res.data
    } catch { /* ignore */ }
  }

  async function fetchAttitude(vid: number) {
    try {
      const res = await getVideoAttitude(vid)
      if (res.data) attitudeToVideo.value = res.data
    } catch { /* ignore */ }
  }

  return { danmuList, attitudeToVideo, fetchDanmuList, fetchAttitude }
})
