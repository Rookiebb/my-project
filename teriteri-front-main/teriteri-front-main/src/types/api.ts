/** 通用 API 响应结构 */
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

/** 分页请求参数 */
export interface PageParams {
  page: number
  size: number
  sort?: string
}

/** 分页响应数据 */
export interface PageData<T> {
  records: T[]
  total: number
  size: number
  current: number
}
