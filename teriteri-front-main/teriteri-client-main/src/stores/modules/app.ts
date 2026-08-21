import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Channel, CarouselItem, TrendingItem } from '@/types'

export const useAppStore = defineStore('app', () => {
  const isLoading = ref(false)
  const channels = ref<Channel[]>([])
  const carousels = ref<CarouselItem[]>([])
  const trendings = ref<TrendingItem[]>([])

  function setLoading(val: boolean) { isLoading.value = val }
  function setChannels(list: Channel[]) { channels.value = list }
  function setCarousels(list: CarouselItem[]) { carousels.value = list }
  function setTrendings(list: TrendingItem[]) { trendings.value = list }

  return { isLoading, channels, carousels, trendings, setLoading, setChannels, setCarousels, setTrendings }
})
