<template>
  <v-app>
    <app-aside-bar-component
      ref="asideBar"
      @on-close="close"
      v-model="drawer"
    />
    <v-app-bar app>
      <v-app-bar-nav-icon @click="clickAppBarMenu"/>
      <v-toolbar-title/>
      <template v-slot:append>
        <app-bar-menu-component/>
      </template>
    </v-app-bar>
    <v-main>
    <v-container class="py-8 px-6" fluid>
      <v-row>
        <v-col>
          <router-view />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'
  import AppAsideBarComponent from '@/components/AppAsideBarComponent.vue'
  import AppBarMenuComponent from '@/components/AppBarMenuComponent.vue'
  import { useAuthStore } from '@/store/auth'
  import { useDashboardStore } from '@/store/dashboard'
  import { useDisplay } from 'vuetify/lib/framework.mjs'

  const display = useDisplay()

  const auth = useAuthStore()
  const dashboard = useDashboardStore()

  const drawer = ref(true)

  const asideBar = ref(null)

  const close = () => {
    if(display.xs.value){
      drawer.value = !drawer.value
    }
  }

  const clickAppBarMenu = () => {
    drawer.value = !drawer.value
    if(drawer.value){
      asideBar.value.closeAll()
    }
  }

  //auth.verify()
 dashboard.obtenerRutas()
</script>
