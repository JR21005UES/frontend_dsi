import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
const light = {
  dark: false,
  colors: {
    background: '#F4F7FD',
    primary: '#1B2A5E',
    secondary: '#F4B400',
  }
}

const dark = {
  dark: true,
  colors: {
    primary: '#313945',
    secondary: '#111C4E'
  }
}
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light,
      dark,
    },
  },
})
