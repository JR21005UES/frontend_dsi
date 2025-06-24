<template>
  <app-data-table-component
    ref="datatable"
    :headers="headers"
    :get-data="getPermissionsPaginated"
  >
    <template #[`item.actions`]="{ item }">
      <v-icon v-for="(icon, i) in icons" :key="i" @click="icon.action(item.id)">
        {{ icon.icon }}
      </v-icon>
    </template>
  </app-data-table-component>
  <form-permission-component
    ref="addPermission"
    :id="idPermission"
    v-model="dialogForm"
    @on-created="updateTable"
    :editMode="true"
  />
  <show-permission-component ref="showPermission" v-model="dialogShow" />
  <app-confirm-dialog-component
    ref="deletePermission"
    v-model="dialogConfirm"
    title="¿Está seguro que desea eliminar el permiso?"
    subtitle="Permisos"
    icon="mdi-alert"
    @on-confirm="delPermission"
  />
</template>
<script setup>
import { ref } from 'vue'
import AppDataTableComponent from '@/components/AppDataTableComponent.vue'
import AppConfirmDialogComponent from '@/components/AppConfirmDialogComponent.vue'
import ShowPermissionComponent from './ShowPermissionComponent.vue'
import FormPermissionComponent from './FormPermissionComponent.vue'
import { useUtilStore } from '@/store/utils'
import usePermission from '../composables/usePermission'

const { getPermissionsPaginated, deletePermission } = usePermission()

const utils = useUtilStore()

const idPermission = ref(null)
const datatable = ref(null)
const addPermission = ref(null)
const showPermission = ref(null)

const dialogForm = ref(false)
const dialogShow = ref(false)
const dialogConfirm = ref(false)

const icons = ref([
  {
    icon: 'mdi-eye',
    title: 'Ver',
    action: async (id) => {
      showPermission.value.getPermission(id)
      dialogShow.value = true
    },
  },
  {
    icon: 'mdi-pencil',
    title: 'Editar',
    action: async (id) => {
      addPermission.value.getPermission(id)
      dialogForm.value = true
    },
  },
  {
    icon: 'mdi-delete',
    title: 'Eliminar',
    action: async (id) => {
      idPermission.value = id
      dialogConfirm.value = true
    },
  },
])

const headers = [
  {
    text: 'Nombre',
    value: 'name',
    align: 'left',
    width: '25%',
  },
  {
    text: 'Acciones',
    value: 'actions',
    align: 'center',
    width: '10%',
  },
]

const delPermission = async () => {
  const response = await deletePermission(idPermission.value)
  if (response.status === 200) {
    utils.showAlert({
      type: 'success',
      message: 'Permiso eliminado con éxito',
      timeout: 3000,
    })
    datatable.value.getData()
  }
}

const updateTable = () => {
  datatable.value.getData()
}

defineExpose({
  updateTable,
})
</script>
