<template>
  <app-dialog-component
    title="Usuario"
    v-bind:model-value="props.modelValue"
    width="700"
  >
    <v-list-item title="Email" :subtitle="userEmail" />
    <v-list-item title="Perfiles" />
    <div class="scroll">
      <v-list-item
        v-for="(perfil, i) in userProfiles"
        :key="i"
        :subtitle="perfil.name"
      />
    </div>
    <v-list-item title="Roles" />
    <div class="scroll" v-if="userRoles.length > 0">
      <v-list-item
        v-for="(rol, i) in userRoles"
        :key="i"
        :subtitle="rol.name"
      />
    </div>
    <div v-else>
      <v-list-item :subtitle="`El usuario no tiene roles asignados`" />
    </div>
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
import useUser from '../composables/useUser'

const { getUserById } = useUser()

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

const userEmail = ref('')
const userProfiles = ref([])
const userRoles = ref([])

const closeDialog = () => {
  emit('update:modelValue', false)
}

const getUser = async (id) => {
  const response = await getUserById(id)
  if (response.status === 200) {
    userEmail.value = response.data.email
    userProfiles.value = response.data.perfiles
    userRoles.value = response.data.roles
  }
}

defineExpose({
  getUser,
})
</script>
<style scoped>
.scroll {
  max-height: 200px;
  overflow-y: auto;
}
</style>
