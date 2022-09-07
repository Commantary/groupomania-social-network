import { useAuthStore } from '../store'
import Axios from './caller.service'

const login = (email: string, password: string) => {
  return Axios.post('/api/v1/auth/login', { email, password })
}

const logout = () => {
  const authStore = useAuthStore()

  authStore.logout()
}

const getToken = () => {
  return useAuthStore().token
}

export const accountService = {
  login,
  logout,
  getToken,
}
