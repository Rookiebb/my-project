import { get, post } from '@/network'
import type { FavoriteItem } from '@/types'

// 站内用户（已登录）获取某用户的收藏夹列表，自己的含私有夹
export function getFavoriteListForUser(uid: number) {
  return get<FavoriteItem[]>('/favorite/get-all/user', { params: { uid } })
}

// 游客获取某用户的收藏夹列表，仅公开收藏夹
export function getFavoriteListForVisitor(uid: number) {
  return get<FavoriteItem[]>('/favorite/get-all/visitor', { params: { uid } })
}

// 创建收藏夹（FormData: title / desc / visible 0私密 1公开）
export function createFavorite(data: { title: string; desc: string; visible: number }) {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('desc', data.desc)
  formData.append('visible', String(data.visible))
  return post<FavoriteItem>('/favorite/create', formData)
}

// 获取当前用户收藏了该视频的收藏夹 id 集合
export function getCollectedFids(vid: number) { return get<number[]>('/video/collected-fids', { params: { vid } }) }

// 收藏/取消收藏视频（FormData: vid / adds / removes，为收藏夹 id 逗号分隔字符串）
export function collectVideo(data: { vid: number; adds: string; removes: string }) {
  const formData = new FormData()
  formData.append('vid', String(data.vid))
  formData.append('adds', data.adds)
  formData.append('removes', data.removes)
  return post('/video/collect', formData)
}

// 取消单个视频在单个收藏夹的收藏（FormData: vid / fid）
export function cancelCollect(data: { vid: number; fid: number }) {
  const formData = new FormData()
  formData.append('vid', String(data.vid))
  formData.append('fid', String(data.fid))
  return post('/video/cancel-collect', formData)
}
