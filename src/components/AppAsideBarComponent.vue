<template>
  <v-navigation-drawer
    color="primary"
    v-bind:model-value="drawer"
    :permanent="isPermanent"
    :rail="modelValue"
    :width="width"
    app
  >
    <template v-slot:prepend>
      <v-list-item v-if="display.xs.value">
        <v-row class="justify-end">
          <v-col class="d-flex justify-end" xs="2">
            <v-icon color="grey" size="16" @click="$emit('onClose')"
              >mdi-close</v-icon
            >
          </v-col>
        </v-row>
      </v-list-item>

      <v-container>
        <logo-component light />
      </v-container>

      <v-list v-model:opened="open">
        <span v-for="(route, i) in dashboard.menu" :key="i">
          <v-tooltip
            v-if="route.childrens && route.childrens.lenght"
            :text="route.nombre"
            color="primary"
          >
            <template v-slot:activator="{ props }">
              <v-list-group
                v-bind="props"
                :key="route.id"
                :value="route.nombre"
                link
              >
                <template v-slot:activator="{ props }">
                  <v-list-item
                    v-bind="props"
                    :prepend-icon="route.icono"
                    :title="route.nombre"
                    exact
                  />
                </template>

                <v-list-item
                  v-for="(child, j) in dashboard.menu[i].childrens"
                  :key="j"
                  :title="child.nombre"
                  :prepend-icon="child.icono"
                  :to="route.uri + child.uri"
                  exact
                />
              </v-list-group>
            </template>
          </v-tooltip>
          <v-tooltip v-else :text="route.name">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :key="i"
                :prepend-icon="route.icon"
                :title="route.name"
                :to="route.uri"
                exact
              />
            </template>
          </v-tooltip>
        </span>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>
<script setup>
import { ref, computed } from 'vue'
import LogoComponent from './LogoComponent.vue'
import { useDashboardStore } from '@/store/dashboard'
import { useDisplay } from 'vuetify'

const dashboard = useDashboardStore()
const display = useDisplay()

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const open = ref(['Usuario'])

const drawer = computed(() => {
  if (display.xs.value || display.sm.value) {
    return props.modelValue
  }
  return true
})

const isPermanent = computed(() => {
  if (display.xs.value) {
    return false
  }
  return true
})

const width = computed(() => {
  if (display.xs.value) {
    return display.width.value
  }
  return '300'
})

const closeAll = () => {
  open.value = []
}

defineExpose({
  closeAll,
})
</script>
<style scoped>
.v-list-group.v-list-group--prepend {
  --parent-padding: calc(var(--indent-padding)) !important;
}
.v-list-group--prepend {
  padding-left: 0px !important;
}
.v-listy-item {
  display: grid;
  grid-template-columns: 34px auto 56px;
}
</style>
