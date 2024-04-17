import LocalStorage from '@/lib/storage'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const store = createPinia()

store.use(
  createPersistedState({
    storage: LocalStorage
  })
)

export function setupStore(app) {
  app.use(store)
}

export { store }
