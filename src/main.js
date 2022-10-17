import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/styles/index.scss'

import elementPlusImportOnDemand from './plugins/element-ui'
import vChart from '@/plugins/v-chart'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(elementPlusImportOnDemand)
app.use(vChart)
app.mount('#app')
