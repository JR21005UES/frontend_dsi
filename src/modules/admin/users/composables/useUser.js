import { ref, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers, requiredIf } from '@vuelidate/validators'
import userServices from '@/services/admin/user.services'
import { useUtilStore } from '@/store/utils'

const useUser = (editMode) => {
  const utils = useUtilStore()

  const isLoading = ref(false)

  const userForm = ref({
    id_usuario: null,
    email: '',
    password: '',
    perfiles: [],
    roles: [],
  })

  const userRules = computed(() => {
    return {
      email: {
        required: helpers.withMessage('El email es requerido', required),
      },
      password: {
        required: helpers.withMessage('La contraseña es requerida', requiredIf(() => !editMode)),
      },
    }
  })

  const userV$ = useVuelidate(userRules, userForm)

  const clean = () => {
    userForm.value.email = ''
    userForm.value.password = ''
    userForm.value.perfiles = []
    userForm.value.roles = []
    userV$.value.$reset()
  }

  const getUserPaginated = async (page, per_page, query) => {
    const response = await userServices.getPaginated(page, per_page, query)
    return response
  }

  const getUserById = async (id) => {
    const response = await userServices.getUserById(id)
    return response
  }

  const postUser = async () => {
    userV$.value.$validate()
    if (!userV$.value.$error) {
      isLoading.value = true
      const response = await userServices.postUser(userForm.value)
      isLoading.value = false
      if (response.status === 201) {
        utils.showAlert({
          type: 'success',
          message: response.data.message,
          timeout: 3000,
        })
        clean()
        userV$.value.$reset()
      }
      return response
    }
  }

  const putUser = async (id) => {
    userV$.value.$validate()
    if (!userV$.value.$error) {
      isLoading.value = true
      const response = await userServices.putUser(id, userForm.value)
      isLoading.value = false
      if (response.status === 200) {
        utils.showAlert({
          type: 'success',
          message: 'Usuario modificado con éxito',
          timeout: 3000,
        })
        clean()
        userV$.value.$reset()
      }
      return response
    }
  }

  const deleteUser = async (id) => {
    const response = await userServices.deleteUser(id)
    return response
  }

  return {
    isLoading,
    userForm,
    getUserPaginated,
    getUserById,
    postUser,
    putUser,
    deleteUser,
    clean,
    emailError: () =>
      userV$.value.email.$error ? userV$.value.email.$errors[0].$message : '',
    passwordError: () =>
      userV$.value.password.$error
        ? userV$.value.password.$errors[0].$message
        : '',
  }
}

export default useUser
