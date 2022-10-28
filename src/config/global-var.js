// 诉求状态标签
export const appealTag = [
  {
    type: 'success',
    status: -1,
    info: '失效',
    color: ''
  },
  {
    type: 'success',
    status: 0,
    info: '待处理',
    color: '#F56C6C'
  },
  {
    type: 'success',
    status: 1,
    info: '推进中',
    color: '#409EFF'
  },
  {
    type: 'success',
    status: 2,
    info: '待评价',
    color: '#E6A23C'
  },
  {
    type: 'success',
    status: 3,
    info: '已完结',
    color: '#67C23A'
  }
]
// 请求来源
export const appealSourceList = [
  {
    label: '代理请求'
  },
  {
    label: '企业请求'
  },
  {
    label: '企业市长直通车'
  }
]

/**
 * 操作类型
 */
export const handleTypes = {
  /**
   * 诉求拆分
   */
  split: -2,
  /**
   * 诉求驳回
   */
  reject: -1,
  /**
   * 诉求提交
   */
  submit: 0,
  /**
   * 诉求签收（倍增办）
   */
  sign: 1,
  /**
   * 诉求转办（倍增办转办给处理部门，处理部门相互转办）
   */
  relay: 2,
  /**
   * 诉求接单（处理部门）
   */
  accept: 3,
  /**
   * 诉求回复（倍增办自办，处理部门进行回复）
   */
  reply: 4,
  /**
   * 企业提交内容
   */
  companySubmit: 5,
  /**
   * 诉求分类和标签修改
   */
  edit: 6,
  /**
   * 诉求办结
   */
  complete: 7,
  /**
   * 诉求评价
   */
  feedback: 8,
  /**
   * 处理部门退回市倍增办
   */
  returnHigh: 9
}

/**
 * 不同的操作类型显示不同的内容项
 */
export const handleTypesComOptions = {
  [handleTypes.submit]: [
    // 操作
    'recordLabel',
    // 状态
    'appealStatusString'
  ],
  [handleTypes.sign]: [
    // 操作
    'recordLabel',
    // 状态
    'appealStatusString',
    // 内容
    'handleContent'
  ],
  [handleTypes.reply]: [
    // 操作
    'recordLabel',
    // 状态
    'appealStatusString',
    // 内容
    'handleContent',
    // 附件
    'enclosure'
  ],
  [handleTypes.complete]: [
    // 操作
    'recordLabel',
    // 状态
    'appealStatusString'
  ],
  [handleTypes.complete]: [
    // 操作
    'recordLabel',
    // 状态
    'appealStatusString'
  ],
  [handleTypes.reject]: [
    // 操作
    'recordLabel',
    // 内容
    'handleContent'
  ],
  [handleTypes.split]: ['recordLabel'],
  [handleTypes.accept]: [
    // 操作
    'recordLabel',
    // 状态
    'appealStatusString',
    // 内容
    'handleContent'
  ],
  [handleTypes.returnHigh]: [
    // 操作
    'recordLabel',
    // 状态
    'appealStatusString',
    // 内容
    'handleContent'
  ],
  [handleTypes.relay]: [
    // 操作
    'recordLabel',
    // 状态
    'appealStatusString',
    // 内容
    'handleContent'
  ]
}
