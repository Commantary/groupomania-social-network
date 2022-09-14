import { defineStore } from 'pinia'
import type { ViewUser } from '../models/ViewUser.model'
import { RoleType } from '../models/Role.model'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: {} as ViewUser,
    token: '' as string,
    logged: false as boolean,
    role: RoleType.UNKNOWN as RoleType,
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
    getRole(state: any): RoleType {
      if (state.role === RoleType.UNKNOWN) {

      }
      return state.role
    },
  },
  actions: {
    updateRole() {
      const authStore = useAuthStore()
      const role = authStore.getUser.role
      authStore.$patch({
        role,
      })
    },
  },
  persist: {
    storage: localStorage,
    paths: ['token', 'user'],
  },
})
