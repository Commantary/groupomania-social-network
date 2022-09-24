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
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "About" */ '@/views/AboutView.vue'),
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
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFoundView.vue'),
  },
]

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (to.name === from.name) {
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

  if (from.name === 'home' && from.meta?.scrollPos)
    from.meta.scrollPos.top = window.scrollY

  if (authStore.tokenIsValid && !authStore.isLogged) {
    authStore.$patch({
      logged: true,
    })
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isLogged)
    next({ name: 'login' })
  else if (to.matched.some(record => !record.meta.requiresAuth) && authStore.isLogged)
    next({ name: 'home' })
  else next()
})

export default router
