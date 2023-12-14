import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/discovery',
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/details/:id',
      name: 'details',
      component: () => import('../views/DetailsView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/discovery',
      name: 'discovery',
      component: () => import('../views/DiscoveryView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/discovery',
      name: 'discovery',
      component: () => import('../views/DiscoveryView.vue'),
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },

    {
      path: '/edit-user',
      name: 'edit-user',
      component: () => import('../views/EditUserView.vue'),
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  const auth = await authStore.validateLogin().catch(() => null)

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  const isLoginOrRegister = to.name === 'login' || to.name === 'register'

  if (requiresAuth) {
    if (!auth) {
      next('/login')
      return
    }
  } else if (isLoginOrRegister && auth) {
    next('/')
    return
  }

  next()
})
export default router
