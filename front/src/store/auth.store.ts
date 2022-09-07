import { defineStore } from 'pinia'

import router from '../router/router'
import { accountService } from '../_services'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: '',
    token: '',
    isLogged: false,
    returnUrl: null,
  }),
  persist: true,
  actions: {
    async login(email: string, password: string) {
      const data = await accountService.login(email, password)
        .then((res) => {
          if (res.status !== 200)
            throw new Error(res.statusText)

          return res.data
        })
        .catch((error) => {
          console.error(error)
          throw error
        })

      // update pinia state
      this.user = data.user
      this.token = data.access_token
      this.isLogged = true

      // redirect to previous url or default to home page
      await router.push(this.returnUrl || '/')
    },
    logout() {
      this.user = ''
      this.token = ''
      this.isLogged = false

      router.push('/login')
    },
  },
})
