import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/appeal-preview'
    },
    // 大屏可视化
    {
      path: '/cool',
      component: () => import('../views/cool/index.vue')
    },
    // 领导试图 （新开的标签页）
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
    // 普通诉求
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
    // 诉求配置
    {
      path: '/appeal-deploy',
      component: () => import('../views/appeal-deploy/index.vue')
    },
    // 概览
    {
      path: '/appeal-preview',
      component: () => import('../views/appeal-preview/index.vue')
    },
    // 日志管理
    {
      path: '/log-manage',
      component: () => import('../views/log-manage/index.vue')
    },
    // table打印
    {
      name: 'print',
      path: '/print',
      component: () => import('../views/print/index.vue')
    },
    // 匹配所有路由
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/404/index.vue'),
      meta: {
        title: '页面找不到'
      }
    }
  ]
})

router.beforeEach((to) => {
  window.parent.postMessage('load_complete', '*')
})

export default router
