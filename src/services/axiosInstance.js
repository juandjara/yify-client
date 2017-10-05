import axios from 'axios'

const instance = axios.create({
  baseURL: "https://yify-api.now.sh"
})

const errorHandler = err => {
  const res = err.response || {}
  const data = res.data || {}
  const name = data.name || err.name
  const msg = data.message || err.message
  console.error(`${name}: ${msg}`)
  return Promise.reject(data)
}

instance.interceptors.response.use(res => res, errorHandler)

export default instance
