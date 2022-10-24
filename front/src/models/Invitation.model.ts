import type { User } from './User.model'

export interface Invitation {
  uuid: string
  username: string
  icon_url: string
  friends_count: number
  created_at: string
  // user: User
}
