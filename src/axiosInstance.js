import axios from 'axios'

const instance = axios.create({
  baseURL: "https://yify-api.now.sh"
})

const errorHandler = err => {
  const {status, data} = err.response
  const description = JSON.stringify(data)
  const msg = `There was an error in the API with code ${status} and data ${description}`
  window.alert(msg)
}

instance.interceptors.response.use(res => res, errorHandler)

export default instance
