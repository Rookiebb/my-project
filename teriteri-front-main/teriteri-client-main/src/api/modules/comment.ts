import { get, post } from '@/network'

// 分页获取视频评论树（每次 10 条；type 1 最热 2 最新）
export function getCommentTree(params: { vid: number; offset: number; type: number }) {
  return get<{ more: boolean; comments: any[] }>('/comment/get', { params })
}

// 展开某根评论下的全部回复（后端直接返回评论树，非 ApiResponse 结构）
export function getMoreComment(id: number) { return get<any>('/comment/reply/get-more', { params: { id } }) }

// 发表评论（FormData: vid / root_id / parent_id / to_user_id / content）
export function sendComment(data: { vid: number; root_id: number; parent_id: number; to_user_id: number; content: string }) {
  const formData = new FormData()
  formData.append('vid', String(data.vid))
  formData.append('root_id', String(data.root_id))
  formData.append('parent_id', String(data.parent_id))
  formData.append('to_user_id', String(data.to_user_id))
  formData.append('content', data.content)
  return post('/comment/add', formData)
}

// 删除评论（FormData: id）
export function deleteComment(id: number) {
  const formData = new FormData()
  formData.append('id', String(id))
  return post('/comment/delete', formData)
}

// 点赞/点踩评论（FormData: id / isLike / isSet）
export function likeOrDislikeComment(data: { id: number; isLike: boolean; isSet: boolean }) {
  const formData = new FormData()
  formData.append('id', String(data.id))
  formData.append('isLike', String(data.isLike))
  formData.append('isSet', String(data.isSet))
  return post('/comment/love-or-not', formData)
}

// 获取 UP 主觉得很赞的评论 id 列表
export function getUpLike(uid: number) { return get<number[]>('/comment/get-up-like', { params: { uid } }) }
