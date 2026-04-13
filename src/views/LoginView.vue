<template>
  <v-app>
    <v-main>
      <v-spacer class="my-10"></v-spacer>
      <v-container fluid fill-height>
        <v-row class="justify-center">
          <v-col xs="12" sm="7" md="5" lg="3">
            <large-logo-component/>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col xs="12" sm="7" md="5" lg="4">
            <v-card class="mt-5 pa-2 pa-10">
              <p class="text-h5 text-center mb-10 mt-5 primary--text">
                Iniciar sesión
              </p>

              <v-form>
                <v-text-field
                :error-messages="v$.email.$error ? v$.email.$errors[0].$message : ''"
                  v-model="form.email"
                  append-inner-icon="mdi-account"
                  label="Usuario / Correo Electrónico *"
                ></v-text-field>
                <v-text-field
                  :error-messages="v$.password.$error ? v$.password.$errors[0].$message : ''"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="Contraseña *"
                  @click:append-inner="showPassword = !showPassword"
                ></v-text-field>
                <v-btn
                  color="primary"
                  class="my-10"
                  block
                  @click="submit"
                >
                  Iniciar sesión
                </v-btn>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-spacer class="mt-10"></v-spacer>
    <v-footer class="bg-primary text-white text-center">
      <v-row>
        <v-col
          sm="2"
          cols="12"
          class="d-sm-flex justify-sm-start d-flex justify-center"
        >
          <large-logo-component max-width="200" light/>
        </v-col>
        <v-col sm="8" cols="12">
          <p>Finanzas Brochelle S.A. de C.V.</p>
          <p>Universidad de El Salvador</p>
          <p>© 2026 - Todos los derechos reservados</p>
        </v-col>
        <v-col sm="2" cols="12" class="d-none d-sm-flex justify-end">
          <logo-component max-width="200" max-height="75" light/>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import useVuelidate from '@vuelidate/core'
  import { required, helpers, minLength } from '@vuelidate/validators'
  import LogoComponent from '@/components/LogoComponent.vue'
  import LargeLogoComponent from '@/components/LargeLogoComponent.vue'
  import { useDashboardStore } from '@/store/dashboard'
  import { useAuthStore } from '@/store/auth'
  import { useTheme } from 'vuetify/lib/framework.mjs'

  const dashboard = useDashboardStore()
  const auth = useAuthStore()

  const themes = useTheme()

  const showPassword = ref(false)

  const form = ref({
    email: 'admin@example.com',
    password: '123123',
  })

  const rules = computed(() => {
    return {
      email: {
        minLength: helpers.withMessage(
          'El email es requerido',
          minLength(4),
        ),
        required: helpers.withMessage(
          'El nombre de usuario es requerido',
          required,
        ),
      },
      password: {
        required: helpers.withMessage(
          'La contraseña es requerida',
          required,
        ),
      },
    }
  })

  const v$ = useVuelidate(rules, form)

  const submit = async() => {
    v$.value.$validate()
    if(!v$.value.$error){
      auth.login(form.value.email, form.value.password)
    }
  }

</script>
