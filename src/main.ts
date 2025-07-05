import 'vuetify/styles'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import pl from './locales/pl.json'
import startConfig from './data/startConfig.json';

en.app.name = startConfig.app.name;
pl.app.name = startConfig.app.name;

const i18n = createI18n({
  locale: 'pl', // set locale
  fallbackLocale: 'pl', // set fallback locale
  messages: {
    en,
    pl
  },
})

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


createApp(App).use(vuetify).use(i18n).mount('#app')
