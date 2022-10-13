import Mock from 'mockjs'

Mock.mock(/api\/v1\/government\/appeal\/list/, {
  code: 0,
  msg: 'ok',
  data: {
    'currentPage|+1': 1,
    lastPage: 30,
    perPage: 20,
    total: 600,
    'list|10-20': [
      {
        'id|+1': 1001,
        appealCode: '@guid',
        'timeout|1': [0, 1],
        street: '寮步',
        'appealName|1': ['商务法律咨询', '技术创新', '代理记账', '管理咨询服务', '检验检测服务'],
        organizationName: '润洲科技（东莞）有限公司',
        appealTheme: '申请纳入物流运输保',
        appealContent: '为保障华为重点项为保障华为重点项为保障华为重点项',
        appealChildCategoryName: '物流运输保障',
        appealStatus: [0, 1, 2, 3, 4],
        appealLabelName: '环保局张局长, 环保局王局长',
        createdAt: '@date("yyyy-MM-dd")'
      }
    ]
  }
})

Mock.mock(/orderDetails\.json/, {
  success: true,
  msg: '',
  data: {
    serviceCode: '@guid',
    orderTime: '@date("yyyy-MM-dd hh:mm:ss")',
    company: '某一家科技有限公司',
    mobile: '18675751654',
    contact: '张三是也',
    reasons: '@paragraph(10, 100)',
    'serviceName|1': ['商务法律咨询', '技术创新', '代理记账', '管理咨询服务', '检验检测服务'],
    'categoryCode|1': ['法律服务', '技术创新服务', '代理记账服务', '管理咨询服务', '检验检测服务'],
    'price|1': [100, 1000, 100000, '面议'],
    serviceProcess: [
      {
        handleTime: '@date("yyyy-MM-dd hh:mm:ss")',
        status: 1
      },
      {
        handleTime: '@date("yyyy-MM-dd hh:mm:ss")',
        status: 1
      },
      {
        handleTime: '@date("yyyy-MM-dd hh:mm:ss")',
        status: 1
      },
      {
        handleTime: '',
        status: 0
      }
    ]
  }
})
