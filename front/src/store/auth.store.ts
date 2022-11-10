import { defineStore } from 'pinia'
import type { ViewUser } from '../models/ViewUser.model'
import { userService } from '../_services'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: {} as ViewUser,
    token: '' as string,
    logged: false as boolean,
    role: 'unknown' as string,
    returnUrl: null,
  }),
  getters: {
    getReturnUrl(state: any): string {
      return state.returnUrl
    },
    getUser(state: any): ViewUser {
      return state.user
    },
    getToken(state: any): string {
      return state.token
    },
    tokenIsValid(state: any): boolean {
      return state.token.length > 1
    },
    isLogged(state: any): boolean {
      return state.logged
    },
    getUuid(state: any): string {
      return state.user.uuid
    },
    async getRole(state: any) {
      if (state.role === 'unknown')
        await state.updateRole()

      return state.role
    },
    isAdmin(): boolean {
      return this.getRole === 'admin'
    },
  },
  actions: {
    async updateRole() {
      if (this.role === 'unknown') {
        await userService.getUserByUuid(this.user.uuid)
          .then((response: any) => {
            this.role = response.data.user.role
          })
      }
    },
    setDefaultIcon() {
      this.user.icon_url = 'default.png'
    },
  },
  persist: {
    storage: localStorage,
    paths: ['token', 'user'],
  },
})
