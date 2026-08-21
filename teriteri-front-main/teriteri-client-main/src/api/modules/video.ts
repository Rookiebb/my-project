import { get, post } from '@/network'
import type { DanmuItem } from '@/types'

// 用户与视频的交互数据
export interface VideoAttitude {
  love: number
  unlove: number
  coin: number
  collect: number
}

// 获取单个视频详情（含 video / user / category / stats）
export function getVideoDetail(vid: number) {
  return get<{
    video: any
    user: any
    category: any
    stats: { play: number; danmu: number; good: number; coin: number; collect: number; share: number; comment: number }
  }>('/video/getone', { params: { vid } })
}

// 游客随机推荐视频
export function getRandomVideos() { return get<any[]>('/video/random/visitor') }

// 游客累加推荐（vids 为已推荐过的视频 id 逗号分隔字符串）
export function getCumulativeVideos(vids: string) {
  return get<{ videos: any[]; vids: number[]; more: boolean }>('/video/cumulative/visitor', { params: { vids } })
}

// 点赞/点踩视频（FormData: vid / isLove / isSet），返回更新后的交互数据
export function loveOrNot(data: { vid: number; isLove: boolean; isSet: boolean }) {
  const formData = new FormData()
  formData.append('vid', String(data.vid))
  formData.append('isLove', String(data.isLove))
  formData.append('isSet', String(data.isSet))
  return post<VideoAttitude>('/video/love-or-not', formData)
}

// 登录用户播放视频（FormData: vid），后端顺便返回用户与该视频的交互数据（video store 契约函数）
export function getVideoAttitude(vid: number) {
  const formData = new FormData()
  formData.append('vid', String(vid))
  return post<VideoAttitude>('/video/play/user', formData)
}

// 游客观看视频，播放量 +1（FormData: vid）
export function addPlayForVisitor(vid: number) {
  const formData = new FormData()
  formData.append('vid', String(vid))
  return post('/video/play/visitor', formData)
}

// 获取视频弹幕列表（video store 契约函数）
export function getDanmuList(vid: number) { return get<DanmuItem[]>(`/danmu-list/${vid}`) }

// 删除弹幕（FormData: id）
export function deleteDanmu(id: number) {
  const formData = new FormData()
  formData.append('id', String(id))
  return post('/danmu/delete', formData)
}
