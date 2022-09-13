import Axios from './caller.service'

const getAllPosts = () => {
  return Axios.get('/api/v1/posts')
}

const getPost = (uuid: string) => {
  return Axios.get(`/api/v1/posts/${uuid}`)
}

const sendPost = (body: string, images: File[]) => {
  const formData = new FormData()

  formData.append('body', body)

  images.forEach((image) => {
    formData.append('images', image)
  })

  return Axios.post('/api/v1/posts', formData)
}

const deletePost = (uuid: string) => {
  return Axios.delete(`/api/v1/posts/${uuid}`)
}

const likePost = (uuid: string) => {
  return Axios.post(`/api/v1/posts/${uuid}/like`)
}

export const postService = {
  getAllPosts,
  getPost,
  sendPost,
  deletePost,
  likePost,
}
