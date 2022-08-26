import Axios from 'axios'
import CryptoStorage from '@/services/encrypt.storage'

const authHeader = () => {
  const session = JSON.parse(CryptoStorage.getItemStorage('auth', true) || '{}')
  if (session) return `Bearer ${session.token}`
  return ''
}

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})

axios.interceptors.request.use(
  async config => {
    if (authHeader()) config.headers!!.Authorization = authHeader()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  config => config,
  error => {
    if (error.response?.data?.message === 'Unauthorized') {
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axios
