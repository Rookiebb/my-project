import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { TOKEN_KEY } from '@/constants'

export function useAuth() {
  const router = useRouter()
  const userStore = useUserStore()

  const isAuthenticated = computed(() => {
    return !!localStorage.getItem(TOKEN_KEY) && userStore.isLogin
  })

  function requireAuth() {
    if (!isAuthenticated.value) {
      router.push('/')
      return false
    }
    return true
  }

  return { isAuthenticated, requireAuth }
}
