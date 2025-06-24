<template>
  <div>
    <v-row class="justify-end">
      <v-col cols="12" md="6" lg="4">
        <v-text-field
          @input="debounceSearch"
          label="Buscar"
          variant="underlined"
          prepend-icon="fas fa-search"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-table>
          <thead v-if="headers" class="table-header">
            <tr>
              <th
                v-for="(header, index) in headers"
                v-bind:key="index"
                :class="`text-${header.aling ?? 'left text-white'}`"
                :width="header.width"
              >
                {{ header.text }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" v-bind:key="index">
              <td v-for="(header, index) in headers" v-bind:key="index">
                <slot :name="`item.${header.value}`" :item="item">{{
                  item[header.value]
                }}</slot>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-row class="justify-end">
      <v-col cols="12" sm="6" md="3">
        <v-select
          variant="underlined"
          v-model="perPage"
          :items="[5, 10, 20, 50, 100]"
          label="Registros por página"
          outlined
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="9" class="d-flex justify-end mt-2">
        <v-pagination
          :total-visible="5"
          active-color="primary"
          :length="totalPage"
          v-model="currentPage"
        >
        </v-pagination>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  getData: {
    type: Function,
    default: () => {
      return []
    },
  },
  headers: {
    types: {
      text: '',
      value: '',
      aling: '',
      width: '',
    },
    required: true,
  },
})

const totalPage = ref(0)
const perPage = ref(10)
const currentPage = ref(1)
const query = ref('')
const data = ref([])
const debounce = ref()

const getData = async () => {
  const response = await props.getData(
    currentPage.value,
    perPage.value,
    query.value
  )
  if (response.status === 200) {
    data.value = response.data
    totalPage.value = Math.ceil(
      response.headers.total_rows / response.headers.per_page
    )
    currentPage.value = Number(response.headers.page)
  } else {
    data.value = []
  }
}

const debounceSearch = async (event) => {
  clearTimeout(debounce.value)
  debounce.value = setTimeout(async () => {
    query.value = event.target.value
    await getData()
  }, 1000)
}

watch(currentPage, getData)
watch(query, getData)
watch(perPage, () => {
  currentPage.value = 1
  getData()
})

onMounted(() => {
  getData()
})

defineExpose({
  getData,
})
</script>
<style lang="scss">
.table-header {
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
}
</style>
