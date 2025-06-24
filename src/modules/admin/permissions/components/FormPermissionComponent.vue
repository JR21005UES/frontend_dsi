<template>
  <app-dialog-component
    title="Nuevo permiso"
    v-bind:model-value="props.modelValue"
    @input="updateValue"
    width="700"
  >
    <v-form>
      <v-row>
        <v-col cols="12" md="12">
          <v-select
            :disabled="isLoading"
            :items="tipoPermissions"
            item-title="name"
            item-value="id"
            variant="outlined"
            label="Tipo de permiso"
            v-model="permissionForm.id_tipo_rol"
            :error-messages="idTipoPermissionError()"
          />
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            :disabled="isLoading"
            v-model="permissionForm.name"
            label="Nombre"
            variant="outlined"
            :error-messages="nameError()"
          />
        </v-col>
      </v-row>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="outlined" text @click="closeDialog"
          >Cancelar</v-btn
        >
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
import usePermission from '../composables/usePermission'

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

const {
  permissionForm,
  getTipoPermission,
  getPermissionById,
  postPermission,
  putPermission,
  idTipoPermissionError,
  nameError,
  isLoading,
  clean,
} = usePermission()

const emit = defineEmits(['update:modelValue', 'onCreated'])

const tipoPermissions = ref([])

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}

const closeDialog = () => {
  clean()
  emit('update:modelValue', false)
}

const getPermission = async (id) => {
  const response = await getPermissionById(id)
  if (response.status === 200) {
    permissionForm.value.id_rol = response.data.id
    permissionForm.value.id_tipo_rol = response.data.id_tipo_rol
    permissionForm.value.name = response.data.name
  }
}

const submit = async () => {
  let response = null
  if (props.editMode) {
    response = await putPermission(permissionForm.value.id_rol)
  } else {
    response = await postPermission()
  }
  if (response?.status === 200 || response?.status === 201) {
    emit('onCreated')
    closeDialog()
  }
}

defineExpose({
  getPermission,
})

onMounted(async () => {
  const response = await getTipoPermission()
  if (response.status === 200) {
    tipoPermissions.value = response.data
  }
})
</script>
