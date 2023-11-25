import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import { en, pt } from './i18n'

import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDz8jwXNoj9tPxQAtWsjQFjTYB-31H4hzo',
  authDomain: 'sword-github-discovery.firebaseapp.com',
  projectId: 'sword-github-discovery',
  storageBucket: 'sword-github-discovery.appspot.com',
  messagingSenderId: '714376362317',
  appId: '1:714376362317:web:98278b789dd8d89eb89f04',
  measurementId: 'G-ES85FSM045'
}

initializeApp(firebaseConfig)

const app = createApp(App)

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: { ...en },
    pt: { ...pt }
  }
})

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
