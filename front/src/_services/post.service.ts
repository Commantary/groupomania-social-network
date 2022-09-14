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

export const postService = {
  getAllPosts,
  getPost,
  sendPost,
  deletePost,
  likePost,
}
