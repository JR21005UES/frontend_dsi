<template>
    <v-dialog :model-value=props.show >
        <v-row justify="center" align="center">
            <v-card width="600" >
            <v-card-title class="text-h5">Crear Usuario</v-card-title>
            <v-divider/> 
            <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-text-field 
                      v-model="form.name"
                      variant="outlined"
                      density="compact"
                      label="Nombre"
                      :error="v$.name.$error"
                      :error-messages="v$.name.$errors.map(e => e.$message)"
                      @blur="v$.name.$touch"
                      @input="v$.name.$touch"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field 
                      v-model="form.email"
                      variant="outlined"
                      density="compact"
                      label="Correo electrónico"
                      :error="v$.email.$error"
                      :error-messages="v$.email.$errors.map(e => e.$message)"
                      @blur="v$.email.$touch"
                      @input="v$.email.$touch"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field 
                      v-model="form.password"
                      variant="outlined"
                      density="compact"
                      label="Contraseña"
                      :error="v$.password.$error"
                      :error-messages="v$.password.$errors.map(e => e.$message)"
                      @blur="v$.password.$touch"
                      @input="v$.password.$touch"
                      type="password"
                    />
                  </v-col>
                </v-row>
            </v-card-text>
            <v-divider/> 
            <v-card-actions>
                <v-spacer />
                <v-btn color="blue" variant="tonal" @click="saveUser">Guardar</v-btn>
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
})

const emit = defineEmits(['update:modelValue', 'onCreated'])

const closeDialog = () => {

  emit('update:modelValue', false)

  // Limpiar el formulario al cerrar el diálogo
  form.value = {
    name: '',
    email: '',
    password: ''
  }
  v$.value.$reset()
}

const form = ref({
  name: '',
  email: '',
  password: ''
})

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('El nombre es obligatorio', required)
  },
  email: {
    required: helpers.withMessage('El correo es obligatorio', required),
    email: helpers.withMessage('El correo no es válido', email)
  },
  password: {
    required: helpers.withMessage('La contraseña es obligatoria', required),
    minLength: helpers.withMessage('La contraseña debe tener al menos 8 caracteres', minLength(8))
  }
}))

const v$ = useVuelidate(rules, form)

const saveUser = async () => {
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
  
  await userServices.postUser(form.value)
  emit('onCreated')
  closeDialog()
  
  // Aquí iría la lógica para guardar el usuario, por ejemplo:
  // userServices.createUser(form.value).then(() => {
  //   emit('onCreated')
  //   closeDialog()
  // })
}

</script>