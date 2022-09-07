import Axios from './caller.service'

const getAllPosts = () => {
  return Axios.get('/api/v1/posts')
}

export const postService = {
  getAllPosts,
}
