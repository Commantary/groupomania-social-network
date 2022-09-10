import { useAuthStore } from '../store'
import Axios from './caller.service'

const login = (email: string, password: string) => {
  return Axios.post('/api/v1/auth/login', { email, password })
}

const signup = (first_name: string, last_name: string, email: string, password: string) => {
  return Axios.post('/api/v1/auth/signup', { first_name, last_name, email, password, role: 'user' })
}

const logout = () => {
  const authStore = useAuthStore()

  authStore.$patch({
    user: '',
    token: '',
    isLogged: false,
  })
}

const getToken = () => {
  return useAuthStore().getToken
}

export const accountService = {
  login,
  signup,
  logout,
  getToken,
}
