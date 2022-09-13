import { defineStore } from 'pinia'
import type { Post } from '../models/Post.model'
import { postService } from '../_services'

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
          res.data.posts.forEach((post: Post) => {
            if (!this.getPosts.find((p: Post) => p.uuid === post.uuid)) {
              console.log('add post', post)
              this.addPost(post)
            }
            // Check if the post have some likesCount
            const post_ = this.getPosts.find((p: Post) => p.uuid === post.uuid)

            // Check if the post have some likesCount
            if (post_.likesCount !== post.likesCount)
              post_.likesCount = post.likesCount

            // Check if the post have some likes
            if (post_.likes.length !== post.likes.length)
              post_.likes = post.likes

            // Check if the post have some commentsCount
            if (post_.commentsCount !== post.commentsCount)
              post_.commentsCount = post.commentsCount

            // Check if the post have some comments
            if (post_.comments.length !== post.comments.length)
              post_.comments = post.comments
          })
        })
        .catch((err) => {
          console.error(err)
        })
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
  },
  persist: {
    storage: sessionStorage,
    paths: ['posts'],
  },
})
