import Axios from './caller.service'
import { routesService } from './index'

const getAllPosts = () => {
  return Axios.get(routesService.routes_api.posts)
}

const getPost = (uuid: string) => {
  return Axios.get(routesService.routes_api.post.replace(':uuid', uuid))
}

const sendPost = (body: string, images: File[]) => {
  const formData = new FormData()

  formData.append('body', body)

  images.forEach((image) => {
    formData.append('images', image)
  })

  return Axios.post(routesService.routes_api.posts, formData)
}

const deletePost = (uuid: string) => {
  return Axios.delete(routesService.routes_api.post.replace(':uuid', uuid))
}

const likePost = (uuid: string) => {
  return Axios.post(routesService.routes_api.post_like.replace(':uuid', uuid))
}

const sendComment = (uuid: string, body: string) => {
  return Axios.post(routesService.routes_api.post_comment.replace(':uuid', uuid), {
    body,
  })
}

const updatePost = (uuid: string, body: string, images: File[], imagesRemoved: string[]) => {
  const formData = new FormData()

  formData.append('body', body)

  images.forEach((image) => {
    formData.append('images', image)
  })

  imagesRemoved.forEach((image) => {
    formData.append('imagesRemoved', image)
  })

  return Axios.put(routesService.routes_api.post.replace(':uuid', uuid), formData)
}

const getUserPosts = (uuid: string) => {
  return Axios.get(routesService.routes_api.user_posts.replace(':uuid', uuid))
}

const getUserLikedPosts = (uuid: string) => {
  return Axios.get(routesService.routes_api.user_liked_posts.replace(':uuid', uuid))
}

export const postService = {
  getAllPosts,
  getPost,
  sendPost,
  deletePost,
  likePost,
  sendComment,
  updatePost,
  getUserPosts,
  getUserLikedPosts,
}
