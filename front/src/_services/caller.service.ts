import axios from 'axios'
import router from '../router/router'
import { accountService } from './account.service'

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
})

/**
 * Interceptor for Authorization header
 */
Axios.interceptors.request.use((req) => {
  const token = accountService.getToken()

  if (token)
    req.headers!.Authorization = `Bearer ${token}`

  return req
})

Axios.interceptors.response.use((res) => {
  return res
}, (error) => {
  // If token is invalid logout and redirect to login
  if (error.response.status === 401) {
    accountService.logout()
    router.push('/login')
  }
})

export default Axios
