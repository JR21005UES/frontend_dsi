<template>
  <div class="text-center">
    <v-dialog
      @click:outside="updateValue"
      :width="display.width.value > 450 ? 450 : display.width.value * 0.9"
      v-bind:model-value="props.modelValue"
      @input="updateValue"
      transition="dialog-center-transition"
    >
      <template v-slot:activator="{ props }">
        <!-- Crear un slot para activar el cuadro de dialogo -->
        <slot :props="props"></slot>
      </template>
      <v-card>
        <v-toolbar :color="color" dark class="mb-7">
          <v-row class="justify-center">
            <p class="text-center text-white text-h6 my-7">{{ props.title }}</p>
          </v-row>
        </v-toolbar>

        <v-row>
          <v-col class="d-flex justify-center">
              <v-icon
                :icon="props.icon"
                color="primary"
                size="60"
                class="d-flex justify-center"
              />
          </v-col>
        </v-row>

        <p v-if="props.subtitle != ''" class="text-subtitle-1 text-center my-7">
          {{ props.subtitle }}
        </p>

        <v-divider class="mb-5"></v-divider>

        <v-card-actions class="justify-space-evenly">
          <v-btn
            width="45%"
            color="primary"
            variant="outlined"
            text
            @click="closeDialog"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="text-white"
            width="45%"
            :color="props.color"
            variant="flat"
            text
            @click="guardar"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
import { useDisplay } from 'vuetify'

const display = useDisplay()

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'mdi-information',
  },
  color: {
    type: String,
    default: 'primary',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
  },
  callback: {
    type: Function,
    default: () => {},
  },
})

const emit = defineEmits(['update:modelValue', 'onConfirm', 'onCancel', 'onSuccess'])

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}

const closeDialog = () => {
  emit('update:modelValue', false)
}

const guardar = async () => {
  if (props.callback) {
    await props.callback()
    emit('onSuccess')
  }else {
    emit('onConfirm')
  }
  closeDialog()
}
</script>

