<template>
  <app-data-table-component
    ref="datatable"
    :headers="headers"
    :get-data="getRolesPaginated"
  >
    <template #[`item.actions`]="{ item }">
      <v-icon v-for="(icon, i) in icons" :key="i" @click="icon.action(item.id)">
        {{ icon.icon }}
      </v-icon>
    </template>
  </app-data-table-component>
  <form-role-component
    ref="addRole"
    :id="idRole"
    v-model="dialogForm"
    @on-created="updateTable"
    :editMode="true"
  />
  <show-role-component ref="showRole" v-model="dialogShow" />
</template>
<script setup>
import { ref } from 'vue'
import AppDataTableComponent from '@/components/AppDataTableComponent.vue'
import ShowRoleComponent from './ShowRoleComponent.vue'
import FormRoleComponent from './FormRoleComponent.vue'
import useRole from '../composables/useRole'

const { getRolesPaginated } = useRole()

const idRole = ref(null)
const datatable = ref(null)
const addRole = ref(null)
const showRole = ref(null)

const dialogForm = ref(false)
const dialogShow = ref(false)

const icons = ref([
  {
    icon: 'mdi-eye',
    title: 'Ver',
    action: async (id) => {
      showRole.value.getRole(id)
      dialogShow.value = true
    },
  },
  {
    icon: 'mdi-pencil',
    title: 'Editar',
    action: async (id) => {
      addRole.value.getRole(id)
      dialogForm.value = true
    },
  },
])

const headers = [
  {
    text: 'Nombre',
    value: 'name',
    align: 'center',
    width: '25%',
  },
  {
    text: 'Código',
    value: 'codigo',
    align: 'center',
    width: '25%',
  },
  {
    text: 'Acciones',
    value: 'actions',
    align: 'center',
    width: '10%',
  },
]

const updateTable = () => {
  datatable.value.getData()
}

defineExpose({
  updateTable,
})
</script>
