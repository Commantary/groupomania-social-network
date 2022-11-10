import { defineStore } from 'pinia'
import { userService } from '../_services'
import type { Invitation } from '../models/Invitation.model'
import { useAuthStore } from './auth.store'

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    socialView: true as boolean,
    invitations: [] as Invitation[],
    invitationsSent: [] as Invitation[],
  }),
  getters: {
    getSocialView(state: any): boolean {
      return state.socialView
    },
    getInvitations(state: any): Invitation[] {
      return state.invitations
    },
    getInvitationsSent(state: any): Invitation[] {
      return state.invitationsSent
    },
  },
  actions: {
    async fetchUserInvitations() {
      this.invitations = [] as Invitation[]

      await userService.getUserInvitations(useAuthStore().getUser.uuid)
        .then((res) => {
          this.invitations.push(...res.data.invitations)
          this.invitationsSent.push(...res.data.invitationsSent)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    async acceptInvitation(invitation: Invitation) {
      await userService.acceptInvitation(invitation.sender.uuid)
        .then(() => {
          this.invitations = this.invitations.filter((i: Invitation) => i.sender.uuid !== invitation.sender.uuid)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    async rejectInvitation(invitation: Invitation) {
      await userService.rejectInvitation(invitation.uuid)
        .then(() => {
          this.invitations = this.invitations.filter((i: Invitation) => i.uuid !== invitation.uuid)
        })
        .catch((err) => {
          console.error(err)
        })
    },
    async sendInvitation(uuid: string) {
      await userService.sendInvitation(uuid)
        .then(() => {
          this.fetchUserInvitations()
        })
        .catch((err) => {
          console.error(err)
        })
    },
    async removeFriend(uuid: string) {
      await userService.deleteFriend(uuid)
        .then(() => {
          this.fetchUserInvitations()
        })
        .catch((err) => {
          console.error(err)
        })
    },
    async updateIcon(uuid: string, file: File) {
      await userService.updateIcon(uuid, file)
        .then((res) => {
          // Update user icon
          useAuthStore().user.icon_url = res.data.icon_name
        })
        .catch((err) => {
          console.error(err)
        })
    },
    async deleteIcon(uuid: string) {
      await userService.deleteIcon(uuid)
        .then(() => {
          // Update user icon
          useAuthStore().setDefaultIcon()
        })
        .catch((err) => {
          console.error(err)
        })
    },
    async updatePassword(uuid: string, actual: string, newPassword: string, confirm: string) {
      await userService.updatePassword(uuid, actual, newPassword, confirm)
        .then((data) => {
          return data
        })
        .catch((err) => {
          console.error(err)

          return err
        })
    },
  },
  /* persist: {
    storage: sessionStorage,
    paths: ['posts'],
  }, */
})
