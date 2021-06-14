import { createApp } from 'vue'
import { App } from './App'
import './registerServiceWorker'
import router from './router'

createApp(App).use(router).mount('#app')
