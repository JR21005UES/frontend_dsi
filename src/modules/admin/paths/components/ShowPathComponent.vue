<template>
  <app-dialog-component
    title="Ruta"
    v-bind:model-value="props.modelValue"
    width="700"
  >
    <v-list-item title="Nombre" :subtitle="pathName" />
    <v-list-item title="Icono">
      <template #subtitle>
        <v-icon>{{ pathIcon }}</v-icon>
      </template>
    </v-list-item>
    <v-list-item title="Roles">
      <template #subtitle>
        <div class="scroll">
          <span v-for="(rol, i) in pathRoles" :key="i">
            <p>{{ rol.name }}</p>
          </span>
        </div>
      </template>
    </v-list-item>
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
import usePath from '../composables/usePath'

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

const { getPathById } = usePath()

const pathName = ref('')
const pathIcon = ref('')
const pathRoles = ref([])

const closeDialog = () => {
  emit('update:modelValue', false)
}

const getPath = async (id) => {
  const response = await getPathById(id)
  if (response.status === 200) {
    pathName.value = response.data.nombre
    pathIcon.value = response.data.icono
    pathRoles.value = response.data.roles
  }
}

defineExpose({
  getPath,
})
</script>
<style scoped>
.scroll {
  max-height: 200px;
  overflow-y: auto;
}
</style>
