<template>
  <app-dialog-component
    title="Permiso"
    v-bind:model-value="props.modelValue"
    width="700"
  >
    <v-list-item title="Nombre" :subtitle="permissionName" />
    <v-list-item title="Tipo" :subtitle="tipoPermission" />
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" variant="outlined" text @click="closeDialog">
        Cerrar
      </v-btn>
    </v-card-actions>
  </app-dialog-component>
</template>
<script setup>
import { ref } from 'vue'
import AppDialogComponent from '@/components/AppDialogComponent.vue'
import usePermission from '../composables/usePermission'

const { getPermissionById } = usePermission()

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
  },
})

const emit = defineEmits(['update:modelValue'])

const tipoPermission = ref('')
const permissionName = ref('')

const closeDialog = () => {
  emit('update:modelValue', false)
}

const getPermission = async (id) => {
  const response = await getPermissionById(id)
  if (response.status === 200) {
    permissionName.value = response.data.name
    //tipoPermission.value = response.data.TipoRol.name
  }
}

defineExpose({
  getPermission,
})
</script>
