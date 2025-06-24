<template>
  <app-dialog-component
    title="Nuevo rol"
    v-bind:model-value="props.modelValue"
    @input="updateValue"
    width="900"
  >
    <v-form>
      <v-row>
        <v-col cols="12" md="12">
          <v-text-field
            :disabled="isLoading"
            v-model="roleForm.nombre"
            label="Rol"
            variant="outlined"
            :error-messages="nombreError()"
          />
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            :disabled="isLoading"
            v-model="roleForm.codigo"
            label="Código"
            variant="outlined"
            :error-messages="codigoError()"
          />
        </v-col>
      </v-row>
      <v-spacer />
      <v-row>
        <v-col cols="12" md="6">
          <v-card min-height="410">
            <v-toolbar
              color="primary"
              title="Listado de permisos disponibles"
            />
            <v-card-text>
              <app-search-list-component
                :items="permissions"
                :itemsSelected="permissionsSelected"
                @add-item="addPermission"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card min-height="410">
            <v-toolbar color="primary" title="Listado de permisos asignados" />
            <v-card-text>
              <app-search-list-component
                :itemsSelected="permissionsSelected"
                @remove-item="removePermission"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="outlined" text @click="closeDialog">
          Cancelar
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
import usePermission from '../../permissions/composables/usePermission'
import useRole from '../composables/useRole'

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

const emit = defineEmits(['update:modelValue', 'onCreated'])

const { getPermissions } = usePermission()
const {
  roleForm,
  getRoleById,
  postRole,
  putRole,
  nombreError,
  codigoError,
  isLoading,
  clean,
} = useRole()

const utils = useUtilStore()

const permissions = ref([])
const permissionsSelected = ref([])

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}

const addPermission = (item) => {
  roleForm.value.roles.push(item.id)
  permissionsSelected.value.push(item)
  const select = permissions.value.findIndex(
    (permission) => permission.id === item.id
  )
  permissions.value.splice(select, 1)
}

const removePermission = (item) => {
  const selectId = roleForm.value.roles.findIndex(
    (permission) => permission === item.id
  )
  const select = permissionsSelected.value.findIndex(
    (permission) => permission.id === item.id
  )
  roleForm.value.roles.splice(selectId, 1)
  permissionsSelected.value.splice(select, 1)
  permissions.value.push(item)
}

const closeDialog = () => {
  clean()
  getPermissionList()
  permissionsSelected.value = []
  emit('update:modelValue', false)
}

const getRole = async (id) => {
  const response = await getRoleById(id)
  if (response.status === 200) {
    roleForm.value.id_rol = response.data.id
    roleForm.value.nombre = response.data.name
    roleForm.value.codigo = response.data.codigo
    permissionsSelected.value = response.data.roles
    permissionsSelected.value.forEach((rol) => {
      roleForm.value.roles.push(rol.id)
    })
  }
}

const getPermissionList = async () => {
  const response = await getPermissions()
  if (response.status === 200) {
    permissions.value = response.data
  }
}

const submit = async () => {
  if (roleForm.value.roles.length > 0) {
    let response = null
    if (props.editMode) {
      response = await putRole(roleForm.value.id_rol)
    } else {
      response = await postRole()
    }
    if (response?.status === 200 || response?.status === 201) {
      emit('onCreated')
      closeDialog()
    }
  } else {
    utils.showAlert({
      type: 'error',
      message: 'Debe seleccionar al menos un rol',
      timeout: 3000,
    })
  }
}

defineExpose({
  getRole,
})

onMounted(async () => {
  getPermissionList()
})
</script>
