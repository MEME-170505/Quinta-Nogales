import { createApp } from 'vue'
import VueScrollTo from 'vue-scrollto'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(VueScrollTo)
app.mount('#app')