import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Main css entry point
import './assets/scss/main.scss'

// FontAwesome lib
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
// Import specific icons
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import {
  faHeart as faHearthSolid,
  faLocationDot,
  faPhone,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons'

// Add to lib
library.add(faHeart, faHearthSolid, faLocationDot, faPhone, faEnvelope)

// Create app
const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)
// Add Store to app
app.use(createPinia())
// Add router to app
app.use(router)
// Mount app
app.mount('#app')
