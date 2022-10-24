import { defineStore } from 'pinia'
import { userService } from '../_services'
import type { Invitation } from '../models/Invitation.model'
import { useAuthStore } from './auth.store'

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    socialView: true as boolean,
    invitations: [] as Invitation[],
  }),
  getters: {
    getSocialView(state: any): boolean {
      return state.socialView
    },
    getInvitations(state: any): Invitation[] {
      return state.invitations
    },
  },
  actions: {
    async fetchUserInvitations() {
      this.invitations = [] as Invitation[]

      await userService.getUserInvitations(useAuthStore().getUser.uuid)
        .then((res) => {
          this.invitations.push(...res.data.invitations)
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
  /* persist: {
    storage: sessionStorage,
    paths: ['posts'],
  }, */
})
