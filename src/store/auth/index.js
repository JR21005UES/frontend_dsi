import { defineStore } from 'pinia'
import authServices from '@/services/auth.services'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    async login(email, password){
      const { data, status } = await authServices.login(email, password)
      console.log('response :>> ', data);

      if(status === 200){
        localStorage.setItem('token', data.access_token)
        router.push('/')
      }
    },
    async verify(){
      const response = await authServices.verify()
      if(response.status === 200){
        this.user = response.data
      }else{
        localStorage.removeItem('token')
        router.push('/login')
      }
    },
    logout(){
      localStorage.removeItem('token')
      router.push('/login')
    },
  },
})
