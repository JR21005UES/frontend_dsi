<template>
  <v-row no-gutters>
    <v-col cols="3" offset="9">
    <v-text-field
        variant="outlined"
        density="compact"
        label="Buscar usuario"
        prepend-inner-icon="mdi-magnify"
        v-model="table_data.search"
      />
    </v-col>
  </v-row>
   <v-data-table-server
    v-model:items-per-page="table_data.items_per_page"
    :headers="headers"
    :items="table_data.items"
    :items-length="table_data.total_rows"
    :loading="table_data.loading"
    no-data-text="No hay usuarios registrados"
    @update:options="fillTable"
  >
  <template #[`item.actions`]="{ item }">
      <v-icon v-for="(icon, i) in icons" :key="i" @click="icon.action(item.id)">
        {{ icon.icon }}
      </v-icon>
    </template>
</v-data-table-server>



  
</template>
<script setup>
import { ref, watch } from 'vue'
import AppDataTableComponent from '@/components/AppDataTableComponent.vue'
import ShowUserComponent from './ShowUserComponent.vue'
import FormUserComponent from './FormUserComponent.vue'
import useUser from '../composables/useUser'
import userServices from '@/services/admin/user.services'
import { load } from 'webfontloader'
import debounce from 'lodash/debounce'
import EditUsuarioComponent from './EditUsuarioComponent.vue'

const { getUserPaginated } = useUser()

const idUser = ref(null)
const datatable = ref(null)
const editUser = ref(null)
const showUser = ref(null)

const dialogForm = ref(null)
const dialogShow = ref(null)

const table_data = ref({
  total_rows: 0,
  items: [],
  items_per_page: 10,
  page: 1,
  loading: false,
  search: '',
})
const icons = ref([
  {
    icon: 'mdi-eye',
    title: 'Ver',
    action: async (id) => {
      showUser.value.getUser(id)
      dialogShow.value = true
    },
  },
  {
    icon: 'mdi-pencil',
    title: 'Editar',
    action: async (id) => {
      editUser.value.getUser(id)
      dialogForm.value = true
    },
  },
  {
    icon: 'mdi-delete',
    title: 'Eliminar',
    action: async (id) => {},
  },
])

const headers = [
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

// const updateTable = () => {
//   datatable.value.getData()
// }

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

const debouncedSearch = debounce(fillTable, 500)

watch(() => table_data.value.search, () => {
  debouncedSearch()
})

</script>
