import { ref, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import pathService from '@/services/admin/path.services'
import { useUtilStore } from '@/store/utils'

const usePath = () => {
  const utils = useUtilStore()

  const isLoading = ref(false)
  const pathForm = ref({
    id: null,
    uri: '',
    nombre: '',
    nombre_uri: '',
    roles: [],
  })

  const useRules = computed(() => {
    return {
      uri: {
        required: helpers.withMessage('El uri es requerido', required),
      },
      nombre_uri: {
        required: helpers.withMessage('El nombre uri es requerido', required),
      },
      nombre: {
        required: helpers.withMessage('El nombre es requerido', required),
      },
    }
  })

  const pathV$ = useVuelidate(useRules, pathForm)

  const clean = () => {
    pathForm.value = {
      id_path: null,
      uri: '',
      nombre: '',
      nombre_uri: '',
      roles: [],
    }
    pathV$.value.$reset()
  }

  const getPaths = async () => {
    const response = await pathService.getPaths()
    return response
  }

  const getPathsPaginated = async (page, per_page, query) => {
    const response = await pathService.getPaginated(page, per_page, query)
    return response
  }

  const getPathById = async (id) => {
    const response = await pathService.getPathById(id)
    return response
  }

  const postPath = async () => {
    pathV$.value.$validate()
    if (!pathV$.value.$error) {
      isLoading.value = true
      const response = await pathService.postPath(pathForm.value)
      isLoading.value = false
      if (response.status === 201) {
        utils.showAlert({
          type: 'success',
          message: 'Ruta creada con éxito',
          timeout: 3000,
        })
        clean()
        pathV$.value.$reset()
      }
      return response
    }
  }

  const putPath = async (id) => {
    pathV$.value.$validate()
    if (!pathV$.value.$error) {
      isLoading.value = false
      const response = await pathService.putPath(id, pathForm.value)
      isLoading.value = false
      if (response.status === 200) {
        utils.showAlert({
          type: 'success',
          message: 'Ruta modificada con éxito',
          timeout: 3000,
        })
        clean()
        pathV$.value.$reset()
      }
      return response
    }
  }

  const deletePath = async (id) => {
    const response = await pathService.deletePath(id)
    return response
  }

  return {
    isLoading,
    pathForm,
    getPaths,
    getPathsPaginated,
    getPathById,
    postPath,
    putPath,
    deletePath,
    clean,

    uriError: () =>
      pathV$.value.uri.$error ? pathV$.value.uri.$errors[0].$message : '',
    nombreUriError: () =>
      pathV$.value.nombre_uri.$error ? pathV$.value.nombre_uri.$errors[0].$message : '',
    nombreError: () =>
      pathV$.value.nombre.$error ? pathV$.value.nombre.$errors[0].$message : '',
  }
}

export default usePath
