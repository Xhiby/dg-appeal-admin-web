/**
 * 价格类型
 */
export const priceType = {
  /**
   * 免费
   */
  free: 0,
  /**
   * 面议
   */
  negotiate: 1,
  /**
   * 固定价格
   */
  fixedPrice: 2
}

/**
 * 价格类型下拉选项
 */
export const priceTypeOptions = [
  {
    label: '免费',
    value: priceType.free
  },
  {
    label: '面议',
    value: priceType.negotiate
  },
  {
    label: '固定价格',
    value: priceType.fixedPrice
  }
]

/**
 * 服务的审核状态
 */
export const serviceCheckStatus = {
  /**
   * 待审核
   */
  pending: 0,
  /**
   * 通过审核
   */
  approved: 1
}

/**
 * 服务的上下架状态
 */

export const serviceStatus = {
  /**
   * 上架
   */
  release: 1,
  /**
   * 下架
   */
  cancel: 0
}

/**
 * 服务的上下架状态下拉
 */

export const serviceStatusOptions = [
  { label: '已上架', value: serviceStatus.release },
  { label: '已下架', value: serviceStatus.cancel }
]

/**
 * 机构审核状态
 */
export const orgCheckStatus = {
  /**
   * 待审核
   */
  pending: 0,
  /**
   * 通过审核
   */
  approved: 1
}

/**
 * 评论类型
 */
export const evaluateType = {
  /**
   * 评论
   */
  feedback: '1',
  /**
   * 投诉
   */
  complaint: '2'
}

//诉求分类
export const appealTypeList = [
  {
    label: '诉求分类',
    value: 0
  },
  {
    label: '全部',
    value: 1
  },
  {
    label: '复工复产',
    value: 2
  },
  {
    label: '其他问题类',
    value: 3
  },
  {
    label: '物流运输保障',
    value: 4
  },
  {
    label: '土地要素',
    value: 5
  },
  {
    label: '惠企政策',
    value: 6
  },
  {
    label: '社保、水及法务问题',
    value: 7
  },
  {
    label: '经营性问题',
    value: 8
  },
  {
    label: '其他问题',
    value: 9
  }
]

// 诉求统计Top
export const topList = [
  {
    tittle: '已完结',
    munber: 1662
  },
  {
    tittle: '推进中',
    munber: 1662
  },
  {
    tittle: '待受理',
    munber: 1662
  },
  {
    tittle: '办结率',
    munber: 33.63
  },
  {
    tittle: '满意度',
    munber: 33.63
  }
]
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
