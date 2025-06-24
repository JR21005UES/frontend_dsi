import { ref, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import roleServices from '@/services/admin/role.services'
import { useUtilStore } from '@/store/utils'

const useRole = () => {
  const utils = useUtilStore()

  const isLoading = ref(false)

  const roleForm = ref({
    id_perfil: null,
    nombre: '',
    codigo: '',
    roles: [],
  })

  const useRules = computed(() => {
    return {
      nombre: {
        required: helpers.withMessage('El nombre es requerido', required),
      },
      codigo: {
        required: helpers.withMessage('El código es requerido', required),
      },
    }
  })

  const roleV$ = useVuelidate(useRules, roleForm)

  const clean = () => {
    roleForm.value = {
      id_perfil: null,
      nombre: '',
      codigo: '',
      roles: [],
    }
    roleV$.value.$reset()
  }

  const getRoles = async () => {
    const response = await roleServices.getRoles()
    return response
  }

  const getRolesPaginated = async (page, per_page, query) => {
    const response = await roleServices.getPaginated(page, per_page, query)
    return response
  }

  const getRoleById = async (id) => {
    const response = await roleServices.getRoleById(id)
    return response
  }

  const postRole = async () => {
    roleV$.value.$validate()
    if (!roleV$.value.$error) {
      isLoading.value = true
      const response = await roleServices.postRole(roleForm.value)
      isLoading.value = false
      if (response.status === 201) {
        utils.showAlert({
          type: 'success',
          message: 'Rol creado con éxito',
          timeout: 3000,
        })
        clean()
        roleV$.value.$reset()
      }
      return response
    }
  }

  const putRole = async (id) => {
    roleV$.value.$validate()
    if (!roleV$.value.$error) {
      isLoading.value = true
      const response = await roleServices.putRole(id, roleForm.value)
      isLoading.value = false
      if (response.status === 200) {
        utils.showAlert({
          type: 'success',
          message: 'Rol modificado con éxito',
          timeout: 3000,
        })
        clean()
        roleV$.value.$reset()
      }
      return response
    }
  }

  return {
    isLoading,
    roleForm,
    getRoles,
    getRolesPaginated,
    getRoleById,
    postRole,
    putRole,
    clean,

    nombreError: () =>
      roleV$.value.nombre.$error
        ? roleV$.value.nombre.$errors[0].$message
        : '',
    codigoError: () =>
      roleV$.value.codigo.$error
        ? roleV$.value.codigo.$errors[0].$message
        : '',
  }
}

export default useRole
