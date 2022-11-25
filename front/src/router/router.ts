import type { RouteRecordRaw, RouterScrollBehavior } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/HomeView.vue'),
    meta: {
      requiresAuth: true,
      scrollPos: {
        top: 0,
        left: 0,
      },
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/auth/LoginView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "Signup" */ '@/views/auth/SignupView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/my-posts',
    name: 'my-posts',
    component: () => import(/* webpackChunkName: "MyPosts" */ '@/views/MyPosts.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import(/* webpackChunkName: "PostsLiked" */ '@/views/PostsLiked.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/invitations',
    name: 'invitations',
    component: () => import(/* webpackChunkName: "Invitations" */ '@/views/Invitations.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "User" */ '@/views/UserView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/post/:uuid',
    name: 'post',
    component: () => import(/* webpackChunkName: "Post" */ '@/views/Post.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/user/:uuid',
    name: 'profile',
    component: () => import(/* webpackChunkName: "Profile" */ '@/views/Profile.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "Settings" */ '@/views/Settings.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/friends-list',
    name: 'friends-list',
    component: () => import(/* webpackChunkName: "FriendsList" */ '@/views/FriendsList.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import(/* webpackChunkName: "Logout" */ '@/views/Logout.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFoundView.vue'),
  },
]

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (to.name === from.name) {
    // @ts-expect-error - scrollPos is not defined in RouteMeta
    to.meta?.scrollPos && (to.meta.scrollPos.top = 0)
    return { left: 0, top: 0 }
  }

  const scrollPos = savedPosition || to.meta?.scrollPos || { left: 0, top: 0 }

  return new Promise((resolve) => {
    // Make a transition for scroll top
    setTimeout(() => resolve(scrollPos), 280)
  })
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // from.meta?.scrollPos && (from.meta.scrollPos.top = window.scrollY)

  if (from.name === 'home' && from.meta?.scrollPos) {
    // @ts-expect-error - scrollPos is not defined in RouteMeta
    from.meta.scrollPos.top = window.scrollY
  }

  if (authStore.tokenIsValid && !authStore.isLogged) {
    authStore.$patch({
      logged: true,
    })
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isLogged) {
    console.log('login')
    next({ name: 'login' })
  } else if (to.matched.some(record => !record.meta.requiresAuth) && authStore.isLogged) {
    console.log('home')
    next({ name: 'home' })
  } else {
    console.log('next')
    next()
  }
})

export default router
