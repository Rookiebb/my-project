/** 将文本中的 URL 或其他可识别的链接转换为可点击的超链接 */
export function linkify(text: string): string {
  if (!text) return text
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%=~_|$?!:,.]*[A-Z0-9+&@#/%=~_|$])/gi
  return text.replace(urlRegex, (url) => `<a href="${url}" class="v-url" target="_blank">${url}</a>`)
}
