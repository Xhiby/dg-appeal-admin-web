import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/styles/index.scss'

import elementPlusImportOnDemand from './plugins/element-ui'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(elementPlusImportOnDemand)

app.mount('#app')
