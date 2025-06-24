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
  <app-general-card-component
    title="Administración de permisos"
    icon="mdi-account-group"
  >
    <template v-slot:button>
      <v-btn
        block
        prepend-icon="mdi-plus"
        class="ma-2"
        color="primary"
        dark
        @click="dialog = true"
      >
        Nuevo permiso
      </v-btn>
    </template>
    <permission-data-table-component ref="permissionTable" />
  </app-general-card-component>

  <form-permission-component
    v-model="dialog"
    @on-created="permissionTable?.updateTable"
  />
</template>
<script setup>
import { ref } from 'vue'
import AppGeneralCardComponent from '@/components/AppGeneralCardComponent.vue'
import PermissionDataTableComponent from '../components/PermissionDataTableComponent.vue'
import FormPermissionComponent from '../components/FormPermissionComponent.vue'

const dialog = ref(false)
const permissionTable = ref(null)

const breadcrumbs = ref([
  {
    text: 'Inicio',
    disabled: false,
    to: '/',
  },
  {
    text: 'Permisos',
    disabled: true,
    to: 'permisos',
  },
])
</script>
