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
    title="Administración de roles"
    icon="mdi-account"
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
        Nuevo rol
      </v-btn>
    </template>
    <role-data-table-component ref="roleTable" />
  </app-general-card-component>

  <form-role-component v-model="dialog" @on-created="roleTable?.updateTable" />
</template>
<script setup>
import { ref } from 'vue'
import AppGeneralCardComponent from '@/components/AppGeneralCardComponent.vue'
import RoleDataTableComponent from '../components/RoleDataTableComponent.vue'
import FormRoleComponent from '../components/FormRoleComponent.vue'

const dialog = ref(false)
const roleTable = ref(null)

const breadcrumbs = ref([
  {
    text: 'Inicio',
    disabled: false,
    to: '/',
  },
  {
    text: 'Roles',
    disabled: true,
    to: 'roles',
  },
])
</script>
