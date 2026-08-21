export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export interface PageParams {
  page: number
  size: number
  sort?: string
}

export interface PageData<T> {
  records: T[]
  total: number
  size: number
  current: number
}

export interface WsMessage {
  type: string
  data: any
  content?: any
}
