<template>
  <v-row>
    <v-col cols="12">
      <div class="search-filters-container px-3 py-4 elevation-1">
        <v-text-field variant="outlined" label="Buscar" v-model="search" />
        <div v-if="items.length > 0" class="search-auto-filters">
          <v-list-item v-for="(item, i) in rows" :key="i" :title="item.name">
            <template v-slot:append>
              <v-btn
                icon="mdi-plus"
                color="green"
                variant="text"
                @click="add(item)"
              />
            </template>
          </v-list-item>
        </div>
        <div v-if="items.length === 0" class="search-auto-filters">
          <v-list-item
            v-for="(item, i) in itemsSelectedSearch"
            :key="i"
            :title="item.name"
          >
            <template v-slot:append>
              <v-btn
                :disabled="props.itemsSelected.length === 1"
                icon="mdi-delete"
                color="red"
                variant="text"
                @click="remove(item)"
              />
            </template>
          </v-list-item>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  itemsSelected: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['addItem', 'removeItem'])

const search = ref(null)

const rows = computed(() => {
  if (search.value === null || search.value === '') {
    return props.items.filter((type) => {
      return !props.itemsSelected.some((item) => item.id === type.id)
    })
  } else {
    return itemsFilters.value.filter((item) => {
      return item.name?.toLowerCase().startsWith(search.value.toLowerCase())
    })
  }
})

const itemsFilters = computed(() => {
  return props.items.filter((type) => {
    return !props.itemsSelected.some((item) => item.id === type.id)
  })
})

const itemsSelectedSearch = computed(() => {
  if (search.value === null || search.value === '') {
    return props.itemsSelected
  } else {
    return props.itemsSelected.filter((item) => {
      return item.name?.toLowerCase().startsWith(search.value.toLowerCase())
    })
  }
})

const add = (item) => {
  emit('addItem', item)
}

const remove = (item) => {
  emit('removeItem', item)
}
</script>
<style scoped>
.search-auto-filters {
  max-height: 200px;
  overflow-y: auto;
}
</style>
