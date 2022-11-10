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
  activities: `${BASE_API}/users/:uuid/activities`,
  user_posts: `${BASE_API}/users/:uuid/posts`,
  user_liked_posts: `${BASE_API}/users/:uuid/like-posts`,
  invitations: `${BASE_API}/users/:uuid/invitations`,
  friend: `${BASE_API}/users/:uuid/friend`,
  icon: `${BASE_API}/users/:uuid/icon`,

}

export const routesService = {
  routes_api,
}
