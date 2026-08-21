import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { TOKEN_KEY } from '@/constants'
import type { ApiResponse } from '@/types'

const instance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 30000,
  withCredentials: true,
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => Promise.reject(err),
)

instance.interceptors.response.use(
  (res: AxiosResponse<ApiResponse>) => {
    const code = res.data?.code
    if (code && code !== 200) {
      ElMessage.error(res.data.message || '未知错误')
    }
    return res
  },
  (err) => {
    console.error(err)
    if (err.response?.headers?.message === 'not login') {
      window.dispatchEvent(new CustomEvent('auth:logout'))
      ElMessage.error('请登录后查看')
    } else {
      ElMessage.error('特丽丽被玩坏了(¯﹃¯)')
    }
    return Promise.reject(err)
  },
)

export function get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  return instance.get<any, AxiosResponse<ApiResponse<T>>>(url, config).then((res) => res.data)
}

export function post<T = any>(url: string, data?: any, headers?: any): Promise<ApiResponse<T>> {
  const config: AxiosRequestConfig = headers ? { headers } : {}
  return instance.post<any, AxiosResponse<ApiResponse<T>>>(url, data, config).then((res) => res.data)
}

export default instance
