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
  <app-general-card-component title="Administración de usuarios" icon="mdi-face-man">
    <template v-slot:button>
      <v-btn block prepend-icon="mdi-plus" class="ma-2" color="primary" dark @click="dialog = true">
        Nuevo usuario
      </v-btn>
    </template>
    <v-row no-gutters>
      <v-col cols="3" offset="9">
        <v-text-field variant="outlined" density="compact" label="Buscar usuario" prepend-inner-icon="mdi-magnify"
          v-model="table_data.search" />
      </v-col>
    </v-row>
    <v-data-table-server v-model:items-per-page="table_data.items_per_page" :headers="headers" :items="table_data.items"
      :items-length="table_data.total_rows" :loading="table_data.loading" no-data-text="No hay usuarios registrados"
      @update:options="fillTable">
      <template #[`item.actions`]="{ item }">
        <v-icon icon="mdi-pencil" class="mr-2" @click="editUser(item.id)" v-tooltip:top="'Editar'" />
        <v-icon icon="mdi-trash-can" class="mr-2" @click="deleteUser(item.id)" v-tooltip:top="'Eliminar'" />
      </template>
    </v-data-table-server>
  </app-general-card-component>

  <EditUsuarioComponent ref="refEditUser" v-model="modal_edit" @onUpdated="fillTable" />

  <FormUsuarioComponent v-model="dialog" @onCreated="fillTable" />
  <AppConfirmDialogComponent v-model="dialog_confirm" :callback="callback" title="¿Eleminar Usuario?"
    subtitle="¿Está seguro de que desea eliminar este usuario?" icon="mdi-information-slab-circle"
    @onSuccess="fillTable" />

  <!-- <form-user-component v-model="dialog"  /> -->
</template>
<script setup>
import { nextTick, ref, watch } from 'vue'
import AppGeneralCardComponent from '@/components/AppGeneralCardComponent.vue'
import UserDataTableComponent from '../components/UserDataTableComponent.vue'
import FormUsuarioComponent from '../components/FormUsuarioComponent.vue'
import userServices from '@/services/admin/user.services'
import debounce from 'lodash/debounce'
import { useUtilStore } from '@/store/utils'
import EditUsuarioComponent from '../components/EditUsuarioComponent.vue'
import AppConfirmDialogComponent from '@/components/AppConfirmDialogComponent.vue'

const dialog = ref(false)
// const userTable = ref(null)
const refEditUser = ref(null)
const modal_edit = ref(false)
const dialog_confirm = ref(false)
const callback = ref(null)
const table_data = ref({
  total_rows: 0,
  items: [],
  items_per_page: 10,
  page: 1,
  loading: false,
  search: '',
})

const headers = [

  {
    title: 'Nombre',
    key: 'name',
    align: 'left',
    width: '25%',
    sortable: false,
  },
  {
    title: 'Correo electrónico',
    key: 'email',
    align: 'left',
    width: '25%',
    sortable: false,
  },
  {
    title: 'Acciones',
    key: 'actions',
    align: 'center',
    width: '10%',
    sortable: false,
  },
]

const breadcrumbs = ref([
  {
    text: 'Inicio',
    disabled: false,
    to: '/',
  },
  {
    text: 'Usuarios',
    disabled: true,
    to: 'users',
  },
])

const fillTable = async () => {
  table_data.value.loading = true
  const params = {
    email: table_data.value.search,
    page: table_data.value.page,
    per_page: table_data.value.items_per_page,
  }

  const { data: {
    per_page,
    total,
    current_page,
    data: usuarios
  } } = await userServices.getPaginated(params)
  table_data.value.total_rows = total
  table_data.value.items_per_page = per_page
  table_data.value.page = current_page
  table_data.value.loading = false
  table_data.value.items = usuarios
}

const editUser = async (id) => {
  modal_edit.value = true
  refEditUser.value.obtenerUsuario(id)
}

const deleteUser = async (id) => {
  dialog_confirm.value = true
  callback.value = () => userServices.deleteUser(id)
}

const debouncedSearch = debounce(fillTable, 500)

watch(() => table_data.value.search, () => {
  debouncedSearch()
})
</script>
