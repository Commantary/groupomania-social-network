const BASE_API = '/api/v1'

const routes_api = {
  // auth
  login: `${BASE_API}/auth/login`,
  signup: `${BASE_API}/auth/signup`,

  // posts
  posts: `${BASE_API}/posts`,
  post: `${BASE_API}/posts/:uuid`,
  post_like: `${BASE_API}/posts/:uuid/like`,
  post_comment: `${BASE_API}/posts/:uuid/comment`,

  // users
  user: `${BASE_API}/users/:uuid`,
}

export const routesService = {
  routes_api,
}
