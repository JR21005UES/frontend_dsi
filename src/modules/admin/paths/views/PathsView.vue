<template>
  <v-row>
    <v-col cols="12">
      <v-breadcrumbs :items="breadcrumbs">
        <template v-slot:prepend>
          <v-icon class="mb-1" size="small" icon="mdi-home" />
        </template>
      </v-breadcrumbs>
    </v-col>
  </v-row>
  <app-general-card-component title="Administración de rutas" icon="mdi-routes">
    <template v-slot:button>
      <v-btn
        block
        prepend-icon="mdi-plus"
        class="ma-2"
        color="primary"
        dark
        @click="dialog = true"
      >
        Nueva ruta
      </v-btn>
    </template>
    <path-data-table-component ref="pathTable" />
  </app-general-card-component>

  <form-path-component v-model="dialog" @on-created="pathTable?.updateTable" />
</template>
<script setup>
import { ref } from 'vue'
import AppGeneralCardComponent from '@/components/AppGeneralCardComponent.vue'
import PathDataTableComponent from '../components/PathDataTableComponent.vue'
import FormPathComponent from '../components/FormPathComponent.vue'

const dialog = ref(false)
const pathTable = ref(null)

const breadcrumbs = ref([
  {
    text: 'Inicio',
    disabled: false,
    to: '/',
  },
  {
    text: 'Rutas',
    disabled: true,
    to: 'paths',
  },
])
</script>
