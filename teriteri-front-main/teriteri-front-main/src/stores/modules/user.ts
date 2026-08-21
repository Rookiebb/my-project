import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import * as userApi from '@/api/modules/user'
import { TOKEN_KEY } from '@/constants'
import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false)
  const user = ref<User | null>(null)

  const isAdmin = computed(() => user.value?.role === 'admin')
  const uid = computed(() => user.value?.uid ?? -1)

  async function fetchPersonalInfo() {
    try {
      const res = await userApi.getPersonalInfo()
      if (res.code === 200) {
        user.value = res.data
        isLogin.value = true
      } else {
        clearUserState()
        ElMessage.error(res.message)
        useRouter().push('/login')
      }
    } catch {
      clearUserState()
      ElMessage.error('请登录后查看')
    }
  }

  function clearUserState() {
    isLogin.value = false
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
  }

  async function logout() {
    clearUserState()
    useRouter().push('/login')
    try {
      await userApi.logout()
    } catch {
      // 即使退出请求失败，也清除本地状态
    }
  }

  return { isLogin, user, isAdmin, uid, fetchPersonalInfo, logout, clearUserState }
})
