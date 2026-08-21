import { get, post } from '@/network'

// 添加视频投稿（FormData 字段：cover 封面文件 / hash / title / type 1自制 2转载 /
// auth 0不声明 1未经允许禁止转载 / duration / mcid 主分区 / scid 子分区 / tags 换行分隔 / descr 简介）
export function addVideo(data: FormData) { return post('/video/add', data) }

// 查询视频当前待上传的分片序号（断点续传）
export function askChunk(hash: string) { return get<number>('/video/ask-chunk', { params: { hash } }) }

// 上传视频分片（FormData 字段：chunk 分片文件 / hash / index 分片序号）
export function uploadChunk(data: FormData) { return post('/video/upload-chunk', data) }

// 取消上传
export function cancelUpload(hash: string) { return get('/video/cancel-upload', { params: { hash } }) }
