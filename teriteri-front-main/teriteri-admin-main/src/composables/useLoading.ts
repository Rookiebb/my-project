import { ref } from 'vue'

export function useLoading(initial = false) {
  const isLoading = ref(initial)
  const loadingText = ref('加载中...')

  function start(text?: string) {
    isLoading.value = true
    if (text) loadingText.value = text
  }

  function stop() {
    isLoading.value = false
  }

  return { isLoading, loadingText, start, stop }
}
