import { defineStore } from 'pinia'

export const useErrorStore = defineStore({
  id: 'error',
  state: () => ({
    notifDisplay: false,
    error: false,
    notifMessage: '',
  }),
  persist: false,
  getters: {
    getNotif(state: any): boolean {
      return state.notifDisplay
    },
    isError(state: any): boolean {
      return state.error
    },
    getNotifMessage(state: any): string {
      return state.notifMessage
    },
  },
  actions: {
    setNotif(value: boolean, error: boolean, payload?: string) {
      this.notifDisplay = value
      this.error = error
      this.notifMessage = payload || ''
    },
  },
})
