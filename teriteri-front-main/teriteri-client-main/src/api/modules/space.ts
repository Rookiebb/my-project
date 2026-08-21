import { get } from '@/network'
import type { User } from '@/types'

// 获取空间主人信息（uid 为路由参数）
export function getUserInfo(uid: number) { return get<User>('/user/info/get-one', { params: { uid } }) }

// 获取用户投稿数
export function getUserWorksCount(uid: number) { return get<number>('/video/user-works-count', { params: { uid } }) }

// 获取用户投稿视频（rule 1 投稿日期 2 播放量 3 点赞数；page 从 1 开始）
export function getUserWorks(params: { uid: number; rule: number; page: number; quantity: number }) {
  return get<{ count: number; list: any[] }>('/video/user-works', { params })
}

// 获取用户最近点赞视频（offset 为已加载条数）
export function getUserLoveVideos(params: { uid: number; offset: number; quantity: number }) {
  return get<any[]>('/video/user-love', { params })
}

// 获取某收藏夹的视频（rule 1 最近收藏 2 最多播放 3 最新投稿）
export function getUserCollectVideos(params: { fid: number; rule: number; page: number; quantity: number }) {
  return get<any[]>('/video/user-collect', { params })
}
