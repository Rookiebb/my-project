import { get } from '@/network'
import type { Channel } from '@/types'

export function getChannels() { return get<Channel[]>('/category/getall') }
