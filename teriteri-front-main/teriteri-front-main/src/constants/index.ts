/** Token 存储键名 */
export const TOKEN_KEY = 'teri_token'

/** 审核状态 */
export enum ReviewStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
}

/** 用户状态 */
export enum UserStatus {
  NORMAL = 0,
  BANNED = 1,
}

/** 内容类型 */
export enum ContentType {
  VIDEO = 'video',
  ARTICLE = 'article',
  COMMENT = 'comment',
  DANMU = 'danmu',
  DYNAMIC = 'dynamic',
}
