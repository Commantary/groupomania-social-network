import type { Commentary, Like, ViewUser } from './index.model'

export interface Post {
  uuid: string
  body: string
  images: string[]
  likesCount: number
  likes: Like[]
  commentsCount: number
  comments: Commentary[]
  createdAt: string
  updatedAt: string
  user: ViewUser
}
