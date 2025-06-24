import { useDashboardStore } from '@/store/dashboard'

export const useUtils = () => {
  const searchPath = (paths, path) => {
    return paths.some((item) => {
      return item.toLowerCase() === path.path.toLowerCase()
    })
  }

  const canNext = async (path) => {
    const dashboard = useDashboardStore()
    if (dashboard.navegacion.length === 0) {
      await dashboard.obtenerRutas()
    }
    return searchPath(dashboard.navegacion, path)
  }

  return {
    canNext,
  }
}

export default useUtils
