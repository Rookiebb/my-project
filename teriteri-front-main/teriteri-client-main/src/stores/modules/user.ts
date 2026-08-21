import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import * as userApi from '@/api/modules/user'
import { TOKEN_KEY } from '@/constants'
import type { User, FavoriteItem } from '@/types'

export const useUserStore = defineStore('user', () => {
  const isLogin = ref(false)
  const user = ref<User | null>(null)
  const openLogin = ref(false)
  const favorites = ref<FavoriteItem[]>([])
  const likeComment = ref<number[]>([])
  const dislikeComment = ref<number[]>([])

  const uid = computed(() => user.value?.uid ?? -1)
  const isAuthenticated = computed(() => isLogin.value && !!localStorage.getItem(TOKEN_KEY))

  function initData() {
    isLogin.value = false
    user.value = null
    favorites.value = []
    likeComment.value = []
    dislikeComment.value = []
  }

  async function fetchPersonalInfo() {
    try {
      const res = await userApi.getPersonalInfo()
      if (res.code === 200) {
        user.value = res.data
        isLogin.value = true
      }
    } catch {
      initData()
    }
  }

  async function logout() {
    initData()
    try { await userApi.logout() } catch { /* ignore */ }
    localStorage.removeItem(TOKEN_KEY)
  }

  async function fetchFavorites(uid: number) {
    try {
      const res = await userApi.getFavorites(uid)
      if (res.data) {
        const list = res.data
        const defaultFav = list.find((item) => item.type === 1)
        const others = list.filter((item) => item.type !== 1)
        favorites.value = defaultFav ? [defaultFav, ...others] : list
      }
    } catch { /* ignore */ }
  }

  async function fetchLikeAndDislike(uid: number) {
    try {
      const res = await userApi.getLikeAndDislike(uid)
      if (res.data) {
        likeComment.value = res.data.userLike || []
        dislikeComment.value = res.data.userDislike || []
      }
    } catch { /* ignore */ }
  }

  return {
    isLogin, user, openLogin, favorites, likeComment, dislikeComment,
    uid, isAuthenticated,
    initData, fetchPersonalInfo, logout, fetchFavorites, fetchLikeAndDislike,
  }
})
