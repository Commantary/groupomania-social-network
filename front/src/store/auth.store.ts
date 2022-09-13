import { defineStore } from 'pinia'
import type { ViewUser } from '../models/ViewUser.model'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: {} as ViewUser,
    token: '' as string,
    logged: false as boolean,
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
      return state.token.length > 0
    },
    isLogged(state: any): boolean {
      return state.logged
    },
    getUuid(state: any): string {
      return state.user.uuid
    },
  },
  persist: {
    storage: localStorage,
    paths: ['token', 'user'],
  },
})
