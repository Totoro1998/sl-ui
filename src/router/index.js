import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/index.vue'
import { APP_ROUTE_PATHS } from '@/lib/const'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: APP_ROUTE_PATHS.REGISTER,
          name: 'REGISTER',
          component: () => import('@/views/Register.vue')
        },
        {
          path: APP_ROUTE_PATHS.LOGIN,
          name: 'LOGIN',
          component: () => import('@/views/Login.vue')
        },
        {
          path: APP_ROUTE_PATHS.LOGIN,
          name: 'LOGIN',
          component: () => import('@/views/Login.vue')
        },
        {
          path: APP_ROUTE_PATHS.COUNTRY_REGION_LIST,
          name: 'COUNTRY_REGION_LIST',
          component: () => import('@/views/CountryRegionList.vue')
        },
        {
          path: APP_ROUTE_PATHS.RESET_PASSWORD,
          name: 'RESET_PASSWORD',
          component: () => import('@/views/ResetPassword.vue')
        }
      ]
    }
  ],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export function setupRouter(app) {
  app.use(router)
}
