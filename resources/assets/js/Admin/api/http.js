import axios from 'axios'

const http = axios.create({
  baseURL: '/api/',
  timeout: 4000,
  headers: { 'Content-Type': 'application/json' }
})

http.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem('businessToken')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

export default http
