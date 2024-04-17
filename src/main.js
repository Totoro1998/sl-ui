import './styles/main.css'

import { createApp } from 'vue'
import { setupI18n } from '@/locales'
import App from './App.vue'
import { setupRouter } from './router'
import '@vant/touch-emulator'
import { setupStore } from '@/store'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)
  await setupI18n(app)
  setupRouter(app)

  app.mount('#app')
}

bootstrap()
