<template>
  <app-dialog-component
    title="Rol"
    v-bind:model-value="props.modelValue"
    width="700"
  >
    <v-list-item title="Nombre" :subtitle="roleName" />
    <v-list-item title="Código" :subtitle="roleCode" />
    <v-list-item title="Permisos">
      <template #subtitle>
        <div class="scroll">
          <span v-for="(permission, i) in rolePermissions" :key="i">
            <p>{{ permission.name }}</p>
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
import useRole from '../composables/useRole'

const { getRoleById } = useRole()

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

const roleName = ref('')
const roleCode = ref('')
const rolePermissions = ref([])

const closeDialog = () => {
  emit('update:modelValue', false)
}

const getRole = async (id) => {
  const response = await getRoleById(id)
  if (response.status === 200) {
    roleName.value = response.data.name
    roleCode.value = response.data.codigo
    rolePermissions.value = response.data.roles
  }
}

defineExpose({
  getRole,
})
</script>
<style scoped>
.scroll {
  max-height: 200px;
  overflow-y: auto;
}
</style>
