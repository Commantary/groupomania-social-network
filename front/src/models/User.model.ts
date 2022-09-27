import type { Friend } from './Friend.model'

export interface User {
  icon_url: string
  first_name: string
  last_name: string
  uuid: string
  bio: string
  friends: Friend[]
}
