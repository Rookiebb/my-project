export interface User {
  uid: number
  username: string
  avatar?: string
  avatar_url?: string
  nickname?: string
  description?: string
  email?: string
  role?: string
  status?: number
  createTime?: string
  updateTime?: string
}

export interface Channel {
  id: number
  name: string
  mcName?: string
  scName?: string
  description?: string
  sort?: number
}

export interface VideoItem {
  vid: number
  title: string
  cover?: string
  videoUrl?: string
  duration?: number
  playCount?: number
  status?: number
  uid?: number
  username?: string
  type?: number
  auth?: number
  descr?: string
  tags?: string
  createTime?: string
}

export interface DanmuItem {
  id: number
  vid: number
  content: string
  time: number
  color: string
  uid: number
  username: string
}

export interface CommentItem {
  id: number
  vid: number
  content: string
  uid: number
  username: string
  avatar: string
  likeCount: number
  createTime: string
  replies?: CommentItem[]
}

export interface ChatItem {
  chat: ChatMeta
  user: ChatUser
  detail: ChatDetail
}

export interface ChatMeta {
  id: number
  userId: number
  anotherId: number
  latestTime: string
  unread: number
}

export interface ChatUser {
  uid: number
  username: string
  avatar: string
}

export interface ChatDetail {
  more: boolean
  list: ChatMessage[]
}

export interface ChatMessage {
  id: number
  userId: number
  content: string
  type: string
  withdraw: number
  createTime: string
}

export interface FavoriteItem {
  id: number
  name: string
  type: number
  count: number
  isPublic: number
}

export interface MsgUnread {
  reply: number
  at: number
  love: number
  system: number
  whisper: number
  dynamic: number
}

export interface TrendingItem {
  id: number
  keyword: string
  heat: number
}

export interface CarouselItem {
  id: number
  imgUrl: string
  link: string
  sort: number
}
