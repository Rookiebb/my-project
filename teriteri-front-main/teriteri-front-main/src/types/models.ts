/** 用户 */
export interface User {
  uid: number
  username: string
  avatar: string
  email: string
  role: string
  status: number
  createTime: string
  updateTime: string
}

/** 频道/分区 */
export interface Channel {
  id: number
  name: string
  description: string
  sort: number
}

/** 视频 */
export interface VideoItem {
  vid: number
  title: string
  cover: string
  duration: number
  playCount: number
  status: number
  uid: number
  username: string
  createTime: string
}
