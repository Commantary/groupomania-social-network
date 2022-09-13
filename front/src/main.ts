import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEllipsis, faFileCirclePlus, faPaperPlane, faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment, faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'
import App from './App.vue'
import router from './router/router'

const app = createApp(App)

// Import fontawesome icons
library.add(faEllipsis)
library.add(faFileCirclePlus)
library.add(faPaperPlane)
library.add(faRegularHeart)
library.add(faSolidHeart)
library.add(faComment)
app.component('FontAwesomeIcon', FontAwesomeIcon)

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.mount('#app')
