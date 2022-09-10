import { defineStore } from 'pinia'

export const useErrorStore = defineStore({
  id: 'error',
  state: () => ({
    notifDisplay: false,
    notifMessage: '',
  }),
  persist: false,
  getters: {
    getNotif(state: any): boolean {
      return state.notifDisplay
    },
    getNotifMessage(state: any): string {
      return state.notifMessage
    },
  },
  actions: {
    setNotif(value: boolean, payload?: string) {
      this.notifDisplay = value
      this.notifMessage = payload || ''
    },
  },
})
