<template>
  <v-snackbar
    v-model="utils.alert.show"
    :color="utils.alert.color"
    elevation="24"
    location="top right"
    :timeout="utils.alert.timeout"
  >
    <v-row>
      <v-col class="d-flex" cols="12">
        <div class="align-self-center justify-center">
          <v-icon v-if="utils.alert.type == 'error'" class="mr-5">
            mdi-close-octagon
          </v-icon>
          <v-icon v-if="utils.alert.type == 'info'" class="mr-5">
            mdi-information
          </v-icon>
          <v-icon v-if="utils.alert.type == 'warning'" class="mr-5">
            mdi-alert
          </v-icon>
          <v-icon v-if="utils.alert.type == 'success'" class="mr-5">
            mdi-check-circle
          </v-icon>
        </div>
        <div class="ml-0">{{ utils.alert.message }}</div>
      </v-col>
    </v-row>

    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="utils.alert.show = false">
        <v-icon small>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script setup>
  import { useUtilStore } from '@/store/utils'

  const utils = useUtilStore()
</script>
