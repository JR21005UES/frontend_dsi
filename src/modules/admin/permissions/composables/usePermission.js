import { ref, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import permissionServices from '@/services/admin/permission.services'
import { useUtilStore } from '@/store/utils'

const usePermission = () => {
  const utils = useUtilStore()

  const isLoading = ref(false)

  const permissionForm = ref({
    id_rol: null,
    id_tipo_rol: null,
    name: '',
  })

  const tipoPermission = ref([])

  const useRules = computed(() => {
    return {
      id_tipo_rol: {
        required: helpers.withMessage('El tipo de permiso es requerido', required),
      },
      name: {
        required: helpers.withMessage('El nombre es requerido', required),
      },
    }
  })

  const permissionV$ = useVuelidate(useRules, permissionForm)

  const clean = () => {
    permissionForm.value.id_tipo_rol = null
    permissionForm.value.name = ''
    permissionV$.value.$reset()
  }

  const getTipoPermission = async () => {
    const response = await permissionServices.getTipoPermission()
    tipoPermission.value = response.data
    return response
  }

  const getPermissions = async () => {
    const response = await permissionServices.getPermissions()
    return response
  }

  const getPermissionsPaginated = async (page, per_page, query) => {
    const response = await permissionServices.getPaginated(page, per_page, query)
    return response
  }

  const getPermissionById = async (id) => {
    const response = await permissionServices.getPermissionById(id)
    return response
  }

  const postPermission = async () => {
    permissionV$.value.$validate()
    if (!permissionV$.value.$error) {
      isLoading.value = true
      const response = await permissionServices.postPermission(permissionForm.value)
      isLoading.value = false
      if (response.status === 201) {
        utils.showAlert({
          type: 'success',
          message: 'Permiso creado con éxito',
          timeout: 3000,
        })
        clean()
        permissionV$.value.$reset()
      }
      return response
    }
  }

  const putPermission = async (id) => {
    permissionV$.value.$validate()
    if (!permissionV$.value.$error) {
      isLoading.value = true
      const response = await permissionServices.updatePermission(id, permissionForm.value)
      isLoading.value = false
      if (response.status === 200) {
        utils.showAlert({
          type: 'success',
          message: 'Permiso modificado con éxito',
          timeout: 3000,
        })
        clean()
        permissionV$.value.$reset()
      }
      return response
    }
  }

  const deletePermission = async (id) => {
    const response = await permissionServices.deleteRole(id)
    return response
  }

  return {
    isLoading,
    permissionForm,
    getTipoPermission,
    getPermissions,
    getPermissionsPaginated,
    getPermissionById,
    postPermission,
    putPermission,
    deletePermission,
    clean,
    idTipoPermissionError: () =>
      permissionV$.value.id_tipo_rol.$error
        ? permissionV$.value.id_tipo_rol.$errors[0].$message
        : '',
    nameError: () =>
      permissionV$.value.name.$error ? permissionV$.value.name.$errors[0].$message : '',
  }
}

export default usePermission
