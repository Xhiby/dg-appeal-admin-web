import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/index.vue')
    },
    {
      name: 'AppealLeaderManager',
      path: '/appeal-leader-manager',
      redirect: '/appeal-leader-manager/list',
      component: () => import('@/layout/LeaderLayout.vue'),
      children: [
        // 诉求列表【领导视图】
        {
          name: 'AppealListForLeader',
          path: 'list',
          component: () => import('@/views/appeal/list/LeaderView.vue')
        }
      ]
    },
    {
      name: 'AppealManager',
      path: '/appeal',
      component: () => import('@/layout/DefaultLayout.vue'),
      redirect: '/appeal/list',
      children: [
        // 诉求列表
        {
          name: 'AppealList',
          path: 'list',
          component: () => import('@/views/appeal/list/index.vue')
        },
        // 诉求详情
        {
          name: 'AppealDetails',
          path: 'details',
          component: () => import('@/views/appeal/details/index.vue')
        },
        // 诉求统计
        {
          name: 'AppealDashBoard',
          path: 'dashboard',
          component: () => import('@/views/appeal/dashboard/index.vue')
        }
      ]
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
