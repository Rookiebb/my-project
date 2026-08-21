import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const matchingCount = ref<number[]>([0, 0])

  function setMatchingCount(counts: number[]) {
    matchingCount.value = counts
  }

  return { matchingCount, setMatchingCount }
})
