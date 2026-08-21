import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMsgUnread } from '@/api'

export const useMessageStore = defineStore('message', () => {
  const msgUnread = ref<number[]>([0, 0, 0, 0, 0, 0])

  async function fetchMsgUnread() {
    try {
      const res = await getMsgUnread()
      const d = res.data
      msgUnread.value = [d.reply, d.at, d.love, d.system, d.whisper, d.dynamic]
    } catch { /* ignore */ }
  }

  function resetUnread() {
    msgUnread.value = [0, 0, 0, 0, 0, 0]
  }

  return { msgUnread, fetchMsgUnread, resetUnread }
})
