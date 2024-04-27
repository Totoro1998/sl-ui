import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/index.vue'
import { APP_ROUTE_PATHS } from '@/lib/const'
import { createPermissionGuard } from './guard/permissionGuard'

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
        },
        {
          path: APP_ROUTE_PATHS.RESET_PASSWORD,
          name: 'RESET_PASSWORD',
          component: () => import('@/views/ResetPassword.vue')
        },
        {
          path: APP_ROUTE_PATHS.PLAYER_REGISTRATION_FORM,
          name: 'PLAYER_REGISTRATION_FORM',
          component: () => import('@/views/PlayerRegistrationForm.vue')
        },
        {
          path: APP_ROUTE_PATHS.COACH_REGISTRATION_FORM,
          name: 'COACH_REGISTRATION_FORM',
          component: () => import('@/views/CoachRegistrationForm.vue')
        },
        {
          path: APP_ROUTE_PATHS.REGISTRATION_LIST,
          name: 'REGISTRATION_LIST',
          component: () => import('@/views/RegistrationList.vue')
        },
        {
          path: `${APP_ROUTE_PATHS.REGISTRATION_DETAIL}/:id`,
          name: 'REGISTRATION_DETAIL',
          component: () => import('@/views/RegistrationDetail.vue'),
          props: true
        },
        {
          path: `${APP_ROUTE_PATHS.PAYMENT}/:id`,
          name: 'PAYMENT',
          component: () => import('@/views/Payment.vue'),
          props: true
        },
        {
          path: APP_ROUTE_PATHS.SHAOLIN_TECHNIQUES,
          name: 'SHAOLIN_TECHNIQUES',
          component: () => import('@/views/ShaolinTechniques.vue')
        },
        {
          path: APP_ROUTE_PATHS.ACTIVE_EMAIL,
          name: 'ACTIVE_EMAIL',
          component: () => import('@/views/ActiveEmail.vue')
        },
        {
          path: APP_ROUTE_PATHS.SEND_EMAIL,
          name: 'SEND_EMAIL',
          component: () => import('@/views/SendEmail.vue')
        }
      ]
    }
  ],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

createPermissionGuard(router)

export function setupRouter(app) {
  app.use(router)
}
