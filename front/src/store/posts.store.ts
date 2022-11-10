import { defineStore } from 'pinia'
import type { Post } from '../models/Post.model'
import { postService } from '../_services'
import type { Commentary } from '../models/Commentary.model'
import type { Invitation } from '../models/Invitation.model'
import { useErrorStore } from './error.store'
import { useAuthStore } from './auth.store'

export const usePostsStore = defineStore({
  id: 'posts',
  state: () => ({
    posts: [] as Post[],
  }),
  getters: {
    getPosts(state: any): Post[] {
      return state.posts
    },
  },
  actions: {
    addPost(post: Post) {
      this.posts.push(post)
    },
    fetchPosts() {
      return postService.getAllPosts()
        .then((res) => {
          // Compare post and add the new post

          this.getPosts.forEach((post: Post) => {
            // Check if the post in the store is in the response
            const postInResponse = res.data.posts.find((postResponse: Post) => postResponse.uuid === post.uuid)

            // if the post is not in the response, remove it from the store
            if (!postInResponse)
              this.posts = this.posts.filter((postStore: Post) => postStore.uuid !== post.uuid)
          })

          res.data.posts.forEach((post: Post) => {
            if (!this.getPosts.find((p: Post) => p.uuid === post.uuid))
              this.addPost(post)

            // Check if the post have some likesCount
            const post_ = this.getPosts.find((p: Post) => p.uuid === post.uuid)

            // Check if the post have some likesCount
            if (post_.likesCount !== post.likesCount)
              post_.likesCount = post.likesCount

            // Check if the post have some likes
            if (post_.likes.length !== post.likes.length)
              post_.likes = post.likes

            // Check if the post have some commentsCount
            if (post_.commentsCount !== post.commentsCount) {
              post_.commentsCount = post.commentsCount

              post_.comments = post.comments
            }

            // Check if author has changed
            if (post_.user !== post.user)
              post_.user = post.user
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
    async fetchUserPosts() {
      const userPosts = [] as Post[]

      await postService.getUserPosts(useAuthStore().getUser.uuid)
        .then((res) => {
          userPosts.push(...res.data.posts)
        })
        .catch((err) => {
          console.error(err)
        })

      return userPosts
    },
    async fetchUserPostsLiked() {
      const userPosts = [] as Post[]

      await postService.getUserLikedPosts(useAuthStore().getUser.uuid)
        .then((res) => {
          userPosts.push(...res.data.posts)
        })
        .catch((err) => {
          console.error(err)
        })

      return userPosts
    },
    async updatePost(uuid: string) {
      const postIndex = this.posts.findIndex((p: Post) => p.uuid === uuid)

      await postService.getPost(uuid)
        .then((res) => {
          this.posts[postIndex] = res.data.post
        })
        .catch((err) => {
          console.error(err)
        })
    },
    removePost(uuid: string) {
      this.posts = this.posts.filter((post: Post) => post.uuid !== uuid)

      return postService.deletePost(uuid)
    },
    addComment(postUuid: string, comment: Commentary) {
      const postIndex = this.posts.findIndex((p: Post) => p.uuid === postUuid)

      this.posts[postIndex].comments.unshift(comment)

      this.posts[postIndex].commentsCount += 1
    },
    sendComment(uuid: string, body: string) {
      return postService.sendComment(uuid, body)
        .then((res) => {
          this.addComment(uuid, res.data.comment)

          return res.data.comment
        })
        .catch((err) => {
          console.error(err)
        })
    },
    editPost(uuid: string, body: string, images: File[], imagesRemoved: string[]) {
      return postService.updatePost(uuid, body, images, imagesRemoved)
        .then((res) => {
          this.updatePost(uuid)

          useErrorStore().setNotif(true, false, 'Post mise à jour avec succès')
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
  persist: {
    storage: sessionStorage,
    paths: ['posts'],
  },
})
