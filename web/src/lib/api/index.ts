import axios from 'axios'

const baseURL = process.env.API_URL
const api = axios.create({ baseURL })

api.interceptors.request.use(config => {
  if (!process.browser && process.env.API_URL_SSR != null) {
    config.baseURL = process.env.API_URL_SSR
  }
  return config
})

api.defaults.headers.common['Content-Type'] = 'application/json'

export default api
