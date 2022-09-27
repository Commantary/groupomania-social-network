import type { Post } from './Post.model'
import type { Commentary } from './Commentary.model'

export interface Activity {
  comment?: Commentary
  post: Post
  type: string
}
