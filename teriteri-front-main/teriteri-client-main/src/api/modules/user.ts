import { get, post } from '@/network'
import type { User, FavoriteItem } from '@/types'

// ---------- 账户 ----------

// 获取当前登录用户信息（user store 契约函数）
export function getPersonalInfo() { return get<User>('/user/personal/info') }

// 退出登录（user store 契约函数）
export function logout() { return get('/user/account/logout') }

// 登录，成功返回 { token, user }
export function login(data: { username: string; password: string }) {
  return post<{ token: string; user: User }>('/user/account/login', data)
}

// 注册
export function register(data: { username: string; password: string; confirmedPassword: string }) {
  return post('/user/account/register', data)
}

// 修改当前用户密码（FormData: pw 旧密码 / npw 新密码）
export function updatePassword(data: { pw: string; npw: string }) {
  const formData = new FormData()
  formData.append('pw', data.pw)
  formData.append('npw', data.npw)
  return post('/user/password/update', formData)
}

// ---------- 个人资料 ----------

// 更新用户部分个人信息（FormData: nickname / description / gender 0女 1男 2保密）
export function updateUserInfo(data: { nickname: string; description: string; gender: number }) {
  const formData = new FormData()
  formData.append('nickname', data.nickname)
  formData.append('description', data.description)
  formData.append('gender', String(data.gender))
  return post('/user/info/update', formData)
}

// 更新用户头像（FormData: file），成功返回新头像 url
export function updateUserAvatar(data: { file: File }) {
  const formData = new FormData()
  formData.append('file', data.file)
  return post<string>('/user/avatar/update', formData)
}

// ---------- user store 契约函数（端点属收藏/评论域，勿改名） ----------

// 获取登录用户可见的某用户收藏夹列表
export function getFavorites(uid: number) { return get<FavoriteItem[]>('/favorite/get-all/user', { params: { uid } }) }

// 获取用户赞踩的评论 id 集合
export function getLikeAndDislike(uid: number) {
  return get<{ userLike: number[]; userDislike: number[] }>('/comment/get-like-and-dislike', { params: { uid } })
}
