import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/index.vue')
    },
    {
      path: '/appeal-deploy',
      component: () => import('../views/appeal-deploy/index.vue')
    },
    {
      path: '/appeal-preview',
      component: () => import('../views/appeal-preview/index.vue')
    }
  ]
})

export default router
