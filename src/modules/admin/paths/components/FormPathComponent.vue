<template>
  <app-dialog-component
    title="Nueva ruta"
    v-bind:model-value="props.modelValue"
    @input="updateValue"
    width="900"
  >
    <v-form>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            :disabled="isLoading"
            v-model="pathForm.nombre"
            label="Nombre"
            variant="outlined"
            :error-messages="nombreError()"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :disabled="isLoading"
            v-model="pathForm.nombre_uri"
            label="Nombre uri"
            variant="outlined"
            :error-messages="nombreUriError()"
          />
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            :disabled="isLoading"
            v-model="pathForm.uri"
            label="Uri"
            variant="outlined"
            :error-messages="uriError()"
          />
        </v-col>
      </v-row>
      <v-spacer />
      <v-row>
        <v-col cols="12" md="6">
          <v-card min-height="410">
            <v-toolbar color="primary" title="Listado de roles disponibles" />
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
            <v-toolbar color="primary" title="Listado de roles asignados" />
            <v-card-text>
              <app-search-list-component
                :itemsSelected="permissionsSelected"
                @remove-item="removePermission"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-divider />
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
import usePermission from '../../permissions/composables/usePermission'
import usePath from '../composables/usePath'
import { useUtilStore } from '@/store/utils'

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
  pathForm,
  getPaths,
  getPathById,
  postPath,
  putPath,
  uriError,
  nombreUriError,
  nombreError,
  isLoading,
  clean,
} = usePath()

const utils = useUtilStore()

const paths = ref([])
const permissions = ref([])
const permissionsSelected = ref([])

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}

const addPermission = (item) => {
  pathForm.value.roles.push(item.id)
  permissionsSelected.value.push(item)
  const select = permissions.value.findIndex(
    (permission) => permission.id === item.id
  )
  permissions.value.splice(select, 1)
}

const removePermission = (item) => {
  const selectId = pathForm.value.roles.findIndex(
    (permission) => permission === item.id
  )
  const select = permissionsSelected.value.findIndex(
    (permission) => permission.id === item.id
  )
  pathForm.value.roles.splice(selectId, 1)
  permissionsSelected.value.splice(select, 1)
  permissions.value.push(item)
}

const closeDialog = () => {
  clean()
  getPermissionList()
  permissionsSelected.value = []
  emit('update:modelValue', false)
}

const getPath = async (id) => {
  const response = await getPathById(id)
  if (response.status === 200) {
    pathForm.value.id_path = response.data.id
    pathForm.value.uri = response.data.uri
    pathForm.value.nombre = response.data.nombre
    pathForm.value.nombre_uri = response.data.nombre_uri
    permissionsSelected.value = response.data.roles
    permissionsSelected.value.forEach((rol) => {
      pathForm.value.roles.push(rol.id)
    })
  }
}

const getPathsList = async () => {
  const response = await getPaths()
  if (response.status === 200) {
    paths.value = response.data
  }
}

const getPermissionList = async () => {
  const response = await getPermissions()
  if (response.status === 200) {
    permissions.value = response.data
  }
}

const submit = async () => {
  if (pathForm.value.roles.length > 0) {
    let response = null
    pathForm.value.nombre_uri = pathForm.value.nombre.toLocaleLowerCase()
    pathForm.value.orden = Number(pathForm.value.orden)

    if (props.editMode) {
      response = await putPath(pathForm.value.id_path)
    } else {
      response = await postPath()
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
  getPath,
})

onMounted(async () => {
  getPermissionList()
  getPathsList()
})
</script>
