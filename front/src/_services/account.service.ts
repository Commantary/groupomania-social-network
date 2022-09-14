import { useAuthStore } from '../store'
import Axios from './caller.service'
import { routesService } from './index'

const login = (email: string, password: string) => {
  return Axios.post(routesService.routes_api.login, { email, password })
}

const signup = (first_name: string, last_name: string, email: string, password: string) => {
  return Axios.post(routesService.routes_api.signup, { first_name, last_name, email, password, role: 'user' })
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
