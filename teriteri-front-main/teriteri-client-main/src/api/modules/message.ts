import { get, post } from '@/network'
import type { ChatItem, MsgUnread } from '@/types'

// 获取当前用户全部消息未读数（message store 契约函数）
export function getMsgUnread() { return get<MsgUnread>('/msg-unread/all') }

// 清除某一列未读（FormData: column，取值 reply/at/love/system/whisper/dynamic）
export function clearMsgUnread(column: string) {
  const formData = new FormData()
  formData.append('column', column)
  return post('/msg-unread/clear', formData)
}

// 获取最近聊天列表（offset 为已加载的聊天数）
export function getRecentChatList(offset: number) {
  return get<{ list: ChatItem[]; more: boolean }>('/msg/chat/recent-list', { params: { offset } })
}

// 与某用户首次聊天时创建聊天，已存在则不返回 data
export function createChat(uid: number) { return get<ChatItem>(`/msg/chat/create/${uid}`) }

// 移除与某用户的聊天
export function deleteChat(uid: number) { return get(`/msg/chat/delete/${uid}`) }

// 切换到私聊窗口时更新在线状态并清除未读
export function updateWhisperOnline(from: number) { return get('/msg/chat/online', { params: { from } }) }

// 离开私聊窗口时更新为离开状态（无需登录态）
export function updateWhisperOutline(from: number, to: number) {
  return get('/msg/chat/outline', { params: { from, to } })
}

// 获取更多历史消息记录（uid 为聊天对象，offset 为已加载的消息数）
export function getMoreChatDetails(params: { uid: number; offset: number }) {
  return get<{ more: boolean; list: any[] }>('/msg/chat-detailed/get-more', { params })
}

// 删除消息（FormData: id）
export function deleteChatDetailed(id: number) {
  const formData = new FormData()
  formData.append('id', String(id))
  return post('/msg/chat-detailed/delete', formData)
}
