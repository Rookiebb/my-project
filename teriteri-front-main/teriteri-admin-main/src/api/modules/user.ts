import { get, post } from '@/network'
import type { User } from '@/types'

export function getPersonalInfo() {
  return get<User>('/admin/personal/info')
}

export function logout() {
  return get('/admin/account/logout')
}

export function login(data: { username: string; password: string }) {
  return post<{ token: string; user: User }>('/admin/account/login', data)
}
