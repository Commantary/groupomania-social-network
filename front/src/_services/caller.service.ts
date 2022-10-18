import axios from 'axios'
import router from '../router/router'
import { useErrorStore } from '../store/index'
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

/**
 * Interceptor when error in the API
 */
Axios.interceptors.response.use((res) => {
  return res
}, (error) => {
  if (!error.response) {
    // Network error
    useErrorStore().setNotif(true, true, error)
    return Promise.reject(error)
  } else {
    // If token is invalid logout and redirect to log in
    if (error.response.status === 401) {
      if (router.currentRoute.value.name !== 'login') {
        accountService.logout()
        router.push({ name: 'login' })
      } else {
        useErrorStore().setNotif(true, true, error.response.data.error)
      }
    } else {
      // API error
      useErrorStore().setNotif(true, true, error.response.data.error)
      return Promise.reject(error)
    }
  }

  // If token is invalid logout and redirect to log in
  if (error.response.status === 401) {
    accountService.logout()
    router.push('/login').then(r => console.log(r)).catch(e => console.log(e))
  }
})

export default Axios
