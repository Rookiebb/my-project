import { get, post } from '@/network'

/** 视频审核分页查询参数 */
export interface VideoPageParams {
  /** 视频状态：0 待审核 1 已过审 2 未过审 3 违规封禁/已删源 */
  vstatus: number
  page: number
  quantity: number
}

/** 查询指定状态的视频总数 */
export function getVideoTotal(vstatus: number) {
  return get<number>('/review/video/total', { params: { vstatus } })
}

/** 分页查询视频审核列表 */
export function getVideoPage(params: VideoPageParams) {
  return get<any[]>('/review/video/getpage', { params })
}

/** 查询视频审核详情 */
export function getReviewVideoDetail(vid: number | string) {
  return get<any>('/review/video/getone', { params: { vid } })
}

/** 修改视频状态（过审/打回/封禁删源） */
export function changeVideoStatus(data: { vid: number | string; status: number }) {
  const formData = new FormData()
  formData.append('vid', String(data.vid))
  formData.append('status', String(data.status))
  return post('/video/change/status', formData)
}
