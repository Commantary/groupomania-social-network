import axios from 'axios'

const API_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function getAuthHeader() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export function postLogin(email: string, password: string) {
  return axios.post(`${API_URL}/api/v1/auth/login`, { email, password })
}
