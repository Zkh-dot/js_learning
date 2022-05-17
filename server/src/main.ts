import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import isPortReachable from 'is-port-reachable';

createApp(App).use(router).mount('#app')
