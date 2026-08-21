import EmojiList from '@/assets/json/emoji.json'

/** 将文本中的 URL 或其他可识别的链接转换为可点击的超链接 */
export function linkify(text: string): string {
  if (!text) return text
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%=~_|$?!:,.]*[A-Z0-9+&@#/%=~_|$])/gi
  return text.replace(urlRegex, (url) => `<a href="${url}" class="v-url" target="_blank">${url}</a>`)
}

/** 将文本中的有效表情转换成图片 */
export function emojiText(text: string): string {
  if (!text) return text
  const regex = /\[(.*?)\]/g
  return text.replace(regex, (match, p1: string) => {
    const emoji = EmojiList.find((e) => e.name === `[${p1}]`)
    if (emoji) {
      return `<a class="emotion-items" title="${emoji.name}"><div class="img-emoji" style="background-image:url('${emoji.url}'); height:20px; width:20px;"></div></a>`
    }
    return match
  })
}

/** 对文本进行关键词高亮 */
export function highlightKeyword(keyword: string, inputString: string): string {
  const regex = new RegExp(`(${keyword.split('').join('|')})`, 'gi')
  return inputString.replace(regex, '<em class="suggest_high_light">$1</em>')
}

/** 处理播放时长，将秒数转换为 mm:ss 格式 */
export function handleTime(time: number | string): string {
  let t = Math.floor(Number(time))
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
}

/** 将格式化后的播放时长还原为秒数 */
export function returnSecond(time: string): number {
  const [m, s] = time.split(':').map(Number)
  return m * 60 + s
}

/** 处理大于 1 万的数字：198765 → '19.9万' */
export function handleNum(num: number): string {
  if (num > 10000) {
    return (num / 10000).toFixed(1) + '万'
  }
  return String(num)
}

/** 处理日期：24 小时内显示相对时间，否则显示 月-日 / 年-月-日 */
export function handleDate(dateTime: number | string | Date): string {
  const currentDate = new Date()
  const inputDate = new Date(dateTime)
  const timeDifference = currentDate.getTime() - inputDate.getTime()

  if (timeDifference < 60 * 60 * 1000) {
    const minutes = Math.floor(timeDifference / 1000 / 60)
    return `${minutes}分钟前`
  } else if (timeDifference < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(timeDifference / 1000 / 60 / 60)
    return `${hours}小时前`
  } else {
    const currentYear = currentDate.getFullYear()
    const inputYear = inputDate.getFullYear()
    const month = inputDate.getMonth() + 1
    const day = inputDate.getDate()
    if (inputYear < currentYear) {
      return `${inputYear}-${month}-${day}`
    }
    return `${month}-${day}`
  }
}

/** 处理日期：格式化为 年月日时分 / 今天时分 / 昨天时分 */
export function handleDateTime(dateTime: number | string | Date): string {
  const inputDate = new Date(dateTime)
  if (isNaN(inputDate.getTime())) {
    return '未知时间'
  }
  const now = new Date()
  const hours = String(inputDate.getHours()).padStart(2, '0')
  const minutes = String(inputDate.getMinutes()).padStart(2, '0')

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

  if (isSameDay(inputDate, now)) {
    return `今天 ${hours}:${minutes}`
  }
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (isSameDay(inputDate, yesterday)) {
    return `昨天 ${hours}:${minutes}`
  }
  const year = inputDate.getFullYear()
  const month = String(inputDate.getMonth() + 1).padStart(2, '0')
  const day = String(inputDate.getDate()).padStart(2, '0')
  return `${year}年${month}月${day}日 ${hours}:${minutes}`
}

/** 处理日期：格式化为 月日时分（12-26 02:53） */
export function handleDateTime2(dateTime: number | string | Date): string {
  const inputDate = new Date(dateTime)
  if (isNaN(inputDate.getTime())) {
    return '未知时间'
  }
  const month = String(inputDate.getMonth() + 1).padStart(2, '0')
  const day = String(inputDate.getDate()).padStart(2, '0')
  const hours = String(inputDate.getHours()).padStart(2, '0')
  const minutes = String(inputDate.getMinutes()).padStart(2, '0')
  return `${month}-${day} ${hours}:${minutes}`
}

/** 处理时间：格式化为 年-月-日 时:分 或者 n小时前 / n分钟前 / 刚刚 */
export function handleDateTime3(dateTime: number | string | Date): string {
  const inputDate = new Date(dateTime)
  if (isNaN(inputDate.getTime())) {
    return '未知时间'
  }

  const timeDiff = Date.now() - inputDate.getTime()

  if (timeDiff < 30 * 1000) {
    return '刚刚'
  } else if (timeDiff < 60 * 1000) {
    return '1分钟前'
  } else if (timeDiff < 60 * 60 * 1000) {
    const minutes = Math.floor(timeDiff / 1000 / 60)
    return `${minutes}分钟前`
  } else if (timeDiff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(timeDiff / 1000 / 60 / 60)
    return `${hours}小时前`
  }

  const year = String(inputDate.getFullYear())
  const month = String(inputDate.getMonth() + 1).padStart(2, '0')
  const day = String(inputDate.getDate()).padStart(2, '0')
  const hours = String(inputDate.getHours()).padStart(2, '0')
  const minutes = String(inputDate.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}`
}

/** 计算昵称长度，中日文字符占 2 长度，其他 1 长度 */
export function getNicknameLength(nickname: string): number {
  let length = 0
  for (let i = 0; i < nickname.length; i++) {
    if (/[\u4e00-\u9fa5\u0800-\u4e00]/.test(nickname[i])) {
      length += 2
    } else {
      length += 1
    }
  }
  return length
}

/** 根据经验值计算用户等级 */
export function handleLevel(exp: number): number {
  if (exp < 50) return 0
  if (exp < 200) return 1
  if (exp < 1500) return 2
  if (exp < 4500) return 3
  if (exp < 10800) return 4
  if (exp < 28800) return 5
  return 6
}

/** 生成随机 uuid */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
