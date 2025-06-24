<template lang="">
  <v-menu offset-y>
    <template v-slot:activator="{ props }">
      <div class="d-flex justify-end align-center">
        <v-btn append-icon="mdi-chevron-down" dark v-bind="props">
          {{ auth.user?.email }}
        </v-btn>
      </div>
    </template>
    <v-list density="compact">
      <v-list-item>
        <v-list-item-title class="ml-2">
          <span>{{ auth.user?.nombre_usuario }}</span>
        </v-list-item-title>
        <v-list-item-subtitle class="ml-2">
          <span>Administrador</span>
        </v-list-item-subtitle>
        <template v-slot:prepend>
          <v-badge dot color="success" location="bottom end">
            <v-avatar>
              <v-img
                class="mx-auto"
                alt="Avatar"
                src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
              ></v-img>
            </v-avatar>
          </v-badge>
        </template>
      </v-list-item>
      <v-divider class="mt-2"></v-divider>      
      <v-list-item @click="auth.logout()">
        <template v-slot:prepend>
          <v-icon>mdi-logout</v-icon>
        </template>
        <v-list-item-title>
          <span>Cerrar sesión</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup>
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()
</script>
