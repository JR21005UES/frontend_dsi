import { defineStore } from 'pinia'

export const useUtilStore = defineStore('utils', {
  state: () => ({
    alert: {
      show: false,
      type: 'success',
      message: '',
      timeout: 3000,
      color: 'success',
    },
  }),
  actions: {
    showAlert(props = {}){
      let color = 'success'
      switch (props.type) {
        case 'info':
          color = 'info'
          break
        case 'success':
          color = 'success'
          break
        case 'warning':
          color = 'warning'
          break
        case 'error':
          color = 'red-accent-4'
          break
        default:
          color = 'info'
          break
      }
      const alert = {
        show: true,
        type: props.type ? props.type : 'success',
        message: props.message ? props.message : '',
        timeout: props.timeout ? props.timeout  : 3000,
        color: color,
      }

      this.alert = alert
    }
  },
})
