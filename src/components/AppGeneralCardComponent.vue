<template>
  <v-card class="py-5 px-10">
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="8"
        lg="9"
        xl="10"
        class="d-flex align-center"
      >
        <v-icon
          v-if="icon && !display.xs.value"
          class="ma-6"
          :icon="icon"
        ></v-icon>
        <div>
          <v-card-title> {{ title }} </v-card-title>
          <v-card-subtitle v-if="subtitle !== ''">
            {{ subtitle }}
          </v-card-subtitle>
        </div>
      </v-col>
      <v-col xs="12" sm="12" md="4" lg="3" xl="2">
        <slot name="button"></slot>
      </v-col>
    </v-row>
    <slot></slot>
  </v-card>
</template>
<script setup>
  import { defineProps } from 'vue'
  import { useDisplay } from 'vuetify'

  const display = useDisplay();

  defineProps({
    icon: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
  })
</script>
