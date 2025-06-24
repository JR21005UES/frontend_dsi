import axios from 'axios'
import { useUtilStore } from '@/store/utils'

let config = {
  baseURL: import.meta.env.VITE_VUE_APP_API_URL || 'http://127.0.0.1:8000/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
}

const instance = axios.create(config)

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')

  if (token && config.headers !== null) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

instance.interceptors.response.use(
  (response) => {
    // agregar una notificacion de exito cuando el statyus sea 201
    if (response.status === 201) {
      const utils = useUtilStore()
      utils.showAlert({
        type: 'success',
        message: 'Operación exitosa',
        timeout: 3000,
      })
    }
    return response
    },
  async (error) => {
    let message = ''
    let type = 'error'

    if (error.response.status == 0) {
      message = 'No se pudo establecer conexión con el servidor'
    } else if (error.response.status == 500) {
      message = 'Error de servidor'
    } else if (error.response.status >= 400 && error.response.status < 500) {
      console.log('error :>> ', error);
      if (error.response.data.lenght != 0) {
        message = error.response.data
      } else {
        message = error.response.statusText
      }
    } else {
      message = error.response.statusText
    }
    const utils = useUtilStore()

    utils.showAlert({
      type: type,
      message: message,
      timeout: 3000,
    })

    return Promise.resolve(error.message)
  }
)

export default instance
