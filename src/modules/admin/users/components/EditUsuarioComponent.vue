<template>
  <v-dialog :model-value=props.show>
    <v-row justify="center" align="center">
      <v-card width="600">
        <v-card-title class="text-h5">Editar Usuario</v-card-title>
        <v-divider />
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="form.name" variant="outlined" density="compact" label="Nombre"
                :error="v$.name.$error" :error-messages="v$.name.$errors.map(e => e.$message)" @blur="v$.name.$touch"
                @input="v$.name.$touch" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue" variant="tonal" @click="updateUser">Guardar</v-btn>
          <v-btn color="red" variant="tonal" @click="closeDialog">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-dialog>
</template>

<script setup>

import { computed, ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useUtilStore } from '@/store/utils'
import userServices from '@/services/admin/user.services'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  id_usuario: {
    type: Number,
    default: null,
  }
})

const emit = defineEmits(['update:modelValue', 'onUpdated'])

const closeDialog = () => {

  emit('update:modelValue', false)

  // Limpiar el formulario al cerrar el diálogo
  form.value = {
    name: '',
  }
  v$.value.$reset()
}

const form = ref({
  name: '',
})

const id_usuario = ref(null)

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('El nombre es obligatorio', required)
  },
}))

const v$ = useVuelidate(rules, form.value)

const updateUser = async () => {
  v$.value.$touch()
  if (v$.value.$invalid) {
    const utils = useUtilStore()

    utils.showAlert({
      type: "error",
      message: 'Por favor, completa todos los campos requeridos correctamente.',
      timeout: 3000,
    })
    return
  }

  await userServices.updateUser(id_usuario.value, form.value)
  emit('onUpdated')
  closeDialog()
}

const obtenerUsuario = async (id) => {
  const { data } = await userServices.getUserById(id)
  form.value.name = data.name
  id_usuario.value = id
}

defineExpose({
  obtenerUsuario
})

</script>