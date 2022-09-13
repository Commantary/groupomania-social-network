import type { ViewUser } from './ViewUser.model'

export interface Commentary {
  uuid: string
  body: string
  user: ViewUser
}
