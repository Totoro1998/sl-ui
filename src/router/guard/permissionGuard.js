import { useAuthStoreWithOut } from '@/store/auth'

export function createPermissionGuard(router) {
  const authStore = useAuthStoreWithOut()
  const userInfo = authStore.userInfo
  // eslint-disable-next-line no-unused-vars
  router.beforeEach(async (to, from, next) => {
    if (userInfo.email && to.path === '/login') {
      next('/')
    } else {
      next()
    }
  })
}
