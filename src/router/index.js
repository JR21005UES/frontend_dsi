import { createRouter, createWebHistory } from 'vue-router'
import { useUtils } from '@/plugins/utils'
import userRoutes from '@/modules/admin/users/router'
import permissionRouter from '@/modules/admin/permissions/router'
import roleRoutes from '@/modules/admin/roles/router'
import pathRoutes from '@/modules/admin/paths/router'

const { canNext } = useUtils()

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/DashboardView.vue'),
      },
      ...userRoutes,
      ...permissionRouter,
      ...roleRoutes,
      ...pathRoutes,
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/views/ErrorNotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (requiresAuth && !localStorage.getItem('token')) next('/login')
  else if (!requiresAuth && localStorage.getItem('token')) next('/')
  // else if (
  //   requiresAuth &&
  //   localStorage.getItem('token') &&
  //   !(await LocanNext(to))
  // )
    // next('/forbidden')
  else next()
})

export default router
