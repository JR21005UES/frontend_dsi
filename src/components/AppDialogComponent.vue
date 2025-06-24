<template>
  <div class="text-center">
    <v-dialog v-bind:model-value="modelValue" @input="updateValue" persistent>
      <v-card :width="width" class="mx-auto" :max-width="maxWidth">
        <v-toolbar color="primary" :title="title"></v-toolbar>
        <v-card-text>
          <slot></slot>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
  },
  width: {
    type: [String, Number, undefined],
    default: 500,
  },
  maxWidth: {
    type: [String, Number, undefined],
    default: undefined,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}

// const closeModal = () => {
//   emit('update:modelValue', false)
// }
</script>
