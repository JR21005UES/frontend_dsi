<template>
  <app-data-table-component
    ref="datatable"
    :headers="headers"
    :get-data="getPathsPaginated"
  >
    <template #[`item.activo`]="{ item }">
      <v-chip></v-chip>
    </template>
    <template #[`item.actions`]="{ item }">
      <v-icon v-for="(icon, i) in icons" :key="i" @click="icon.action(item.id)">
        {{ icon.icon }}
      </v-icon>
    </template>
  </app-data-table-component>
  <form-path-component
    ref="addPath"
    :id="idPath"
    v-model="dialogForm"
    @on-created="updateTable"
    :editMode="true"
  />
  <show-path-component ref="showPath" v-model="dialogShow" />
  <app-confirm-dialog-component
    ref="deletePath"
    v-model="dialogConfirm"
    title="¿Está seguro que desea eliminar la ruta?"
    subtitle="Rutas"
    icon="mdi-alert"
    @on-confirm="deleteRuta"
  />
</template>
<script setup>
import { ref } from 'vue'
import AppDataTableComponent from '@/components/AppDataTableComponent.vue'
import AppConfirmDialogComponent from '@/components/AppConfirmDialogComponent.vue'
import ShowPathComponent from './ShowPathComponent.vue'
import FormPathComponent from './FormPathComponent.vue'
import { useUtilStore } from '@/store/utils'
import usePath from '../composables/usePath'

const { getPathsPaginated, deletePath } = usePath()

const utils = useUtilStore()

const idPath = ref(null)
const datatable = ref(null)
const addPath = ref(null)
const showPath = ref(null)

const dialogForm = ref(null)
const dialogShow = ref(null)
const dialogConfirm = ref(null)

const icons = ref([
  {
    icon: 'mdi-eye',
    title: 'Ver',
    action: async (id) => {
      showPath.value.getPath(id)
      dialogShow.value = true
    },
  },
  {
    icon: 'mdi-pencil',
    title: 'Editar',
    action: async (id) => {
      addPath.value.getPath(id)
      dialogForm.value = true
    },
  },
  {
    icon: 'mdi-delete',
    title: 'Eliminar',
    action: async (id) => {
      idPath.value = id
      dialogConfirm.value = true
    },
  },
])

const headers = [
  {
    text: 'Nombre',
    value: 'nombre',
    align: 'center',
    width: '',
  },
  {
    text: 'Nombre uri',
    value: 'nombre_uri',
    align: 'center',
    width: '',
  },
  {
    text: 'Ruta',
    value: 'uri',
    align: 'center',
    width: '',
  },
  {
    text: 'Estado',
    value: 'activo',
    align: 'center',
    width: '',
  },
  {
    text: 'Acciones',
    value: 'actions',
    align: 'center',
    width: '',
  },
]

const deleteRuta = async () => {
  const response = await deletePath(idPath.value)
  if (response.status === 200) {
    utils.showAlert({
      type: 'success',
      message: 'Ruta eliminada con éxito',
      timeout: 3000,
    })
  }
}

const updateTable = () => {
  datatable.value.getData()
}

defineExpose({
  updateTable,
})
</script>
