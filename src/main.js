import { createApp } from 'vue'
import router from '../router/routes'
import App from './App.vue'

const app = createApp(App)
// 使用配置的路由
app.use(router)
app.mount('#app')