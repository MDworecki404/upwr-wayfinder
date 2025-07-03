import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
    },
    display: {
    mobileBreakpoint: 'sm',
    thresholds: {
        xs: 0,
        sm: 340,
        md: 540,
        lg: 800,
        xl: 1280,
    },
    },
})


createApp(App).use(vuetify).mount('#app')
