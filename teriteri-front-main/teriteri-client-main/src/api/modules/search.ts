import { get, post } from '@/network'
import type { TrendingItem } from '@/types'

// 获取热搜词条列表
export function getTrendings() { return get<TrendingItem[]>('/search/hot/get') }

// 添加搜索词或给该词热度 +1（FormData: keyword）
export function addSearchWord(keyword: string) {
  const formData = new FormData()
  formData.append('keyword', keyword)
  return post('/search/word/add', formData)
}

// 根据输入内容获取相关搜索推荐词
export function getMatchingWord(keyword: string) { return get<string[]>('/search/word/get', { params: { keyword } }) }

// 获取关键词相关的数据数量 [视频数, 用户数]
export function getSearchCount(keyword: string) { return get<number[]>('/search/count', { params: { keyword } }) }

// 搜索已过审视频
export function searchVideo(params: { keyword: string; page: number }) {
  return get<any[]>('/search/video/only-pass', { params })
}

// 搜索用户
export function searchUser(params: { keyword: string; page: number }) {
  return get<any[]>('/search/user', { params })
}
