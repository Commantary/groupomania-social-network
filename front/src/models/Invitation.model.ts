import type { User } from './User.model'

export interface Invitation {
  uuid: string
  created_at: string
  sender: User
  target: User
}
