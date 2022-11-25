import 'normalize.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faArrowLeft,
  faArrowRightFromBracket,
  faCircleCheck,
  faEllipsis,
  faFileCirclePlus,
  faFireFlameCurved,
  faGear,
  faHouse,
  faMailBulk,
  faPaperPlane,
  faScroll,
  faCircleXmark as faSolidCross,
  faHeart as faSolidHeart,
  faUser,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import {
  faComment,
  faCircleXmark as faRegularCross,
  faHeart as faRegularHeart,
} from '@fortawesome/free-regular-svg-icons'
import router from './router/router'
import App from './App.vue'

const app = createApp(App)

// Import fontawesome icons
library.add(faEllipsis)
library.add(faFileCirclePlus)
library.add(faPaperPlane)
library.add(faRegularHeart)
library.add(faSolidHeart)
library.add(faComment)
library.add(faArrowLeft)
library.add(faSolidCross)
library.add(faRegularCross)
library.add(faHouse)
library.add(faUser)
library.add(faScroll)
library.add(faFireFlameCurved)
library.add(faUserGroup)
library.add(faGear)
library.add(faArrowRightFromBracket)
library.add(faCircleCheck)
library.add(faMailBulk)
app.component('FontAwesomeIcon', FontAwesomeIcon)

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.mount('#app')
