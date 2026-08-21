import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useMessageStore } from './message'
import { useUserStore } from './user'
import { TOKEN_KEY } from '@/constants'
import type { ChatItem, WsMessage } from '@/types'

export const useChatStore = defineStore('chat', () => {
  const ws = ref<WebSocket | null>(null)
  const chatList = ref<ChatItem[]>([])
  const chatId = ref(-1)
  const isChatPage = ref(false)

  function connectWebSocket(): Promise<void> {
    return new Promise((resolve) => {
      if (ws.value) { ws.value.close(); ws.value = null }
      const wsBaseUrl = (process.env as any).VUE_APP_WS_IM_URL as string
      const socket = new WebSocket(`${wsBaseUrl}/im`)
      ws.value = socket

      socket.addEventListener('open', () => {
        const connection = JSON.stringify({
          code: 100,
          content: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        })
        socket.send(connection)
        resolve()
      })

      socket.addEventListener('close', () => {
        useMessageStore().resetUnread()
      })

      socket.addEventListener('message', (e) => handleWsMessage(e))
      socket.addEventListener('error', (e) => console.error('WS error:', e))
    })
  }

  async function closeWebSocket() {
    if (ws.value) { ws.value.close(); ws.value = null }
  }

  function handleWsMessage(e: MessageEvent) {
    const data: WsMessage = JSON.parse(e.data)
    const msgStore = useMessageStore()
    const userStore = useUserStore()

    switch (data.type) {
      case 'error': {
        if (data.data === '登录已过期') {
          msgStore.resetUnread()
          localStorage.removeItem(TOKEN_KEY)
        }
        ElMessage.error(data.data)
        break
      }
      case 'reply': {
        if (data.data?.type === '接收') msgStore.msgUnread[0]++
        else if (data.data?.type === '全部已读') msgStore.msgUnread[0] = 0
        break
      }
      case 'at': {
        if (data.data?.type === '接收') msgStore.msgUnread[1]++
        else if (data.data?.type === '全部已读') msgStore.msgUnread[1] = 0
        break
      }
      case 'love': {
        if (data.data?.type === '接收') msgStore.msgUnread[2]++
        else if (data.data?.type === '全部已读') msgStore.msgUnread[2] = 0
        break
      }
      case 'system': {
        if (data.data?.type === '接收') msgStore.msgUnread[3]++
        else if (data.data?.type === '全部已读') msgStore.msgUnread[3] = 0
        break
      }
      case 'dynamic': {
        if (data.content?.type === '接收') msgStore.msgUnread[5]++
        else if (data.content?.type === '全部已读') msgStore.msgUnread[5] = 0
        break
      }
      case 'whisper': {
        handleWhisperMessage(data.data, userStore.uid)
        break
      }
    }
  }

  function handleWhisperMessage(content: any, selfUid: number) {
    const msgStore = useMessageStore()

    switch (content.type) {
      case '全部已读': {
        msgStore.msgUnread[4] = 0
        chatList.value.forEach(item => { item.chat.unread = 0 })
        break
      }
      case '已读': {
        const count = content.count || 0
        msgStore.msgUnread[4] = Math.max(0, msgStore.msgUnread[4] - count)
        const chat = chatList.value.find(item => item.chat.id === content.id)
        if (chat) chat.chat.unread = 0
        break
      }
      case '移除': {
        const count = content.count || 0
        msgStore.msgUnread[4] = Math.max(0, msgStore.msgUnread[4] - count)
        const i = chatList.value.findIndex(item => item.chat.id === content.id)
        if (i !== -1) {
          if (chatList.value[i].user.uid === chatId.value) chatId.value = -1
          chatList.value.splice(i, 1)
        }
        break
      }
      case '接收': {
        const detail = content.detail
        if (detail.userId !== selfUid) {
          if (!content.online) msgStore.msgUnread[4]++
          const existing = chatList.value.find(item => item.chat.userId === detail.userId)
          if (existing) {
            existing.detail.list.push(detail)
            existing.chat = content.chat
          } else {
            chatList.value.unshift({
              chat: content.chat,
              user: content.user,
              detail: { more: true, list: [detail] },
            })
          }
          sortByLatestTime()
        }
        break
      }
      case '撤回': {
        const targetChat = chatList.value.find(
          item => item.chat.userId === (content.sendId === selfUid ? content.acceptId : content.sendId)
        )
        if (targetChat) {
          const msg = targetChat.detail.list.find((item: any) => item.id === content.id)
          if (msg) msg.withdraw = 1
        }
        break
      }
    }
  }

  function sortByLatestTime() {
    chatList.value.sort((a, b) =>
      new Date(b.chat.latestTime).getTime() - new Date(a.chat.latestTime).getTime()
    )
  }

  return { ws, chatList, chatId, isChatPage, connectWebSocket, closeWebSocket }
})
