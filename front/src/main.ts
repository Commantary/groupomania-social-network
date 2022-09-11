import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons'
import App from './App.vue'
import router from './router/router'
import { useAuthStore } from './store'

const app = createApp(App)

library.add(faEllipsis)
library.add(faHeart)
library.add(faComment)
app.component('FontAwesomeIcon', FontAwesomeIcon)

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)

useAuthStore()

app.use(router)

app.mount('#app')
