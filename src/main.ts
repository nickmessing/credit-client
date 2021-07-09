import { createApp } from 'vue'
import { injectApollo } from './apollo'
import { App } from './App'
import './registerServiceWorker'
import router from './router'

createApp(injectApollo(App)).use(router).mount('#app')
