import { defineStore } from 'pinia'
import dashboardServices from '@/services/dashboard.services'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    menu: [],
    rutas: [],
    navegacion: [],
  }),
  actions: {
    async obtenerRutas() {
      const response = await dashboardServices.getMenu()
      console.log('response :>> ', response);
      if (response.status === 200) {
        this.menu = response.data
        // this.rutas = response.data.rutas
        this.menu.forEach(item => {
          this.navegacion.push(item.uri)
        })
        // this.rutas.forEach(item => {
        //   this.navegacion.push(item.uri)
        // })
      }
    },
  },
})

// const getNavItem = (items) => {
//   return items.filter((item) => {
//     if (!item.mostrar) return false
//     if (item.hijos?.lenght > 0) item.hijos = getNavItem(item.hijos)
//     return true
//   })
// }
