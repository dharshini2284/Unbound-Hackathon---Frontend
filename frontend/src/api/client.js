import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const api = axios.create({ baseURL: BASE_URL })

api.interceptors.request.use((config) => {
  const key = localStorage.getItem('apiKey')
  if (key) config.headers['x-api-key'] = key
  return config
})

export default api
