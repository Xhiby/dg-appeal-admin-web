import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/index.vue')
    },
    {
      path: '/cool',
      component: () => import('../views/cool/index.vue')
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
        },
        //详情
        {
          name: 'AppealLeaderDetail',
          path: 'details',
          component: () => import('@/views/appeal/details/leader-detail.vue')
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
        // 新增代理诉求
        {
          name: 'CreateProxyAppeal',
          path: 'create-appeal-by-proxy',
          component: () => import('@/views/appeal/modify/index.vue')
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
    },
    {
      path: '/log-manage',
      component: () => import('../views/log-manage/index.vue')
    },
    {
      name: 'print',
      path: '/print',
      component: () => import('../views/print/index.vue')
    }
  ]
})

export default router
