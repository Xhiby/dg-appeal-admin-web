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
