import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: {},
    token: '',
    logged: false,
    returnUrl: null,
  }),
  getters: {
    getReturnUrl(state: any): string {
      return state.returnUrl
    },
    getUser(state: any): string {
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
  },
  persist: {
    storage: localStorage,
    paths: ['token'],
  },
})
