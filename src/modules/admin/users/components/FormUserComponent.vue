<template>
  <app-dialog-component
    title="Nuevo usuario"
    v-bind:model-value="modelValue"
    @input="updateValue"
    width="900"
  >
    <v-form>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field
            :disabled="isLoading"
            v-model="userForm.email"
            label="Correo electrónico"
            variant="outlined"
            :error-messages="emailError()"
          />
        </v-col>
        <v-col cols="12" md="12" v-if="!editMode">
          <v-text-field
            :disabled="isLoading"
            v-model="userForm.password"
            label="Contraseña"
            variant="outlined"
            :error-messages="passwordError()"
          />
        </v-col>
      </v-row>
      <v-divider />
      <!-- <v-expansion-panels color="primary">
        <v-expansion-panel title="Roles">
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-card min-height="410">
                  <v-toolbar
                    color="primary"
                    title="Listado de roles disponibles"
                  />
                  <v-card-text>
                    <app-search-list-component
                      :items="perfiles"
                      :itemsSelected="perfilesSelected"
                      @add-item="addPerfiles"
                    />
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card min-height="410">
                  <v-toolbar
                    color="primary"
                    title="Listado de roles asignados"
                  />
                  <v-card-text>
                    <app-search-list-component
                      :itemsSelected="perfilesSelected"
                      @remove-item="removePerfiles"
                    />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-divider />
      <v-expansion-panels color="primary" class="mt-6">
        <v-expansion-panel title="Permisos">
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-card min-height="410">
                  <v-toolbar
                    color="primary"
                    title="Listado de permisos disponibles"
                  />
                  <v-card-text>
                    <app-search-list-component
                      :items="roles"
                      :itemsSelected="rolesSelected"
                      @add-item="addRole"
                    />
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card min-height="410">
                  <v-toolbar
                    color="primary"
                    title="Listado de permisos asignados"
                  />
                  <v-card-text>
                    <app-search-list-component
                      :itemsSelected="rolesSelected"
                      @remove-item="removeRole"
                    />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-divider /> -->
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="outlined" text @click="closeDialog"
          >Cancelar
        </v-btn>
        <v-btn
          :disabled="isLoading"
          color="primary"
          variant="flat"
          text
          @click="submit"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-form>
  </app-dialog-component>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import AppDialogComponent from '@/components/AppDialogComponent.vue'
import AppSearchListComponent from '@/components/AppSearchListComponent.vue'
import { useUtilStore } from '@/store/utils'
import useRole from '../../roles/composables/useRole'
import usePermission from '../../permissions/composables/usePermission'
import useUser from '../composables/useUser'

const { getRoles } = useRole()
const { getPermissions } = usePermission()

const {
  userForm,
  getUserById,
  postUser,
  putUser,
  emailError,
  passwordError,
  isLoading,
  clean,
} = useUser(props.editMode)

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  editMode: {
    type: Boolean,
    default: false,
  },
})

const roles = ref([])
const rolesSelected = ref([])

const emit = defineEmits(['update:modelValue', 'onCreated'])

const utils = useUtilStore()

const perfiles = ref([])
const perfilesSelected = ref([])

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}

const addPerfiles = (item) => {
  userForm.value.perfiles.push(item.id)
  perfilesSelected.value.push(item)
  const select = perfiles.value.find((perfil) => perfil.id === item.id)
  perfiles.value.splice(select, 1)
}

const removePerfiles = (item) => {
  const select = userForm.value.perfiles.find((perfil) => perfil.id === item.id)
  userForm.value.perfiles.splice(select, 1)
  perfilesSelected.value.splice(select, 1)
  perfiles.value.push(item)
}

const closeDialog = () => {
  clean()
  getPermissionList()
  perfilesSelected.value = []
  rolesSelected.value = []
  emit('update:modelValue', false)
}

const getUser = async (id) => {
  const response = await getUserById(id)
  userForm.value.roles = []
  userForm.value.perfiles = []
  if (response.status === 200) {
    userForm.value.id_usuario = response.data.id
    userForm.value.email = response.data.email
    perfilesSelected.value = response.data.perfiles
    perfilesSelected.value.forEach((perfil) => {
      userForm.value.perfiles.push(perfil.id)
    })
    rolesSelected.value = response.data.roles
    rolesSelected.value.forEach((rol) => {
      userForm.value.roles.push(rol.id)
    })
  }
}

const getPermissionList = async () => {
  const response = await getPermissions()
  if (response.status === 200) {
    roles.value = response.data
  }
}

const getRolesList = async () => {
  const response = await getRoles()
  if (response.status === 200) {
    perfiles.value = response.data
  }
}

const addRole = (item) => {
  userForm.value.roles.push(item.id)
  rolesSelected.value.push(item)
  const select = roles.value.findIndex((rol) => rol.id === item.id)
  roles.value.splice(select, 1)
}

const removeRole = (item) => {
  const selectId = userForm.value.roles.findIndex((rol) => rol === item.id)
  const select = rolesSelected.value.findIndex((rol) => rol.id === item.id)
  userForm.value.roles.splice(selectId, 1)
  rolesSelected.value.splice(select, 1)
  roles.value.push(item)
}

const submit = async () => {
  if (userForm.value.perfiles.length > 0) {
    let response = null
    if (props.editMode) {
      response = await putUser(userForm.value.id_usuario)
    } else {
      response = await postUser()
    }
    if (response.status === 200 || response.status === 201) {
      emit('onCreated')
      closeDialog()
    }
  } else {
    utils.showAlert({
      type: 'error',
      message: 'Debe seleccionar al menos un perfil',
      timeout: 3000,
    })
  }
}

defineExpose({
  getUser,
})

onMounted(async () => {
  // getPermissionList()
  // getRolesList()
})
</script>
