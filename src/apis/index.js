import { baseUrl, post, upload, get, put, remove } from './config'

/**
 * 文件上传地址
 */
export const uploadUrl = baseUrl + '/api/v1/common/files/uploads'

/**
 * 文件上传
 * @param {*} data
 */
export const uploadFile = (data) => upload('/api/v1/common/files/uploads', data)

/**
 * 登录
 * @param {*} data
 */
export const login = (data) => post(`/api/v1/admin/login`, data)

/**
 * 创建诉求分类
 * @param {*} data
 */
export const createCategory = (data) => post('/api/v1/government/category/add', data)

/**
 * 创建诉求子类
 * @param {*} data
 */
export const createCategoryChild = (data) => post('/api/v1/government/category/child/add', data)

/**
 * 获取诉求子类分页列表
 * @param {*} data
 */
export const getCategoryChildList = (data) => get('/api/v1/government/category/list', data)

/**
 * 删除诉求子类
 * @param {*} data
 */
export const removeCategoryChild = (id) => remove(`/api/v1/government/category/delete/${id}`)

/**
 * 获取诉求分类列表
 * @param {*} data
 */
export const getCategoryList = (data) => get('/api/v1/government/category/getAll', data)

// appeal-department
/**
 * 创建诉求部门
 * @param {*} data
 */
export const createGovernmentDep = (data) => post('/api/v1/government/department/add1', data)

/**
 * 删除诉求部门
 * @param {*} data
 */
export const removeGovernmentDep = (id) => remove(`/api/v1/government/department/delete/${id}`)

/**
 * 修改诉求部门
 * @param {*} data
 */
export const updateGovernmentDep = (data) => put('/api/v1/government/department/update1', data)

/**
 * 获取诉求部门列表
 * @param {*} data
 */
export const getGovernmentDepList = (data) => get('/api/v1/government/department/list', data)

/**
 * 获取服务专员列表
 * @param {*} data
 */
export const getGovernmentServiceList = (data) => get('', data)

// appeal-tag
/**
 * 创建诉求标签
 * @param {*} data
 */
export const createGovernmentLabel = (data) => post('/api/v1/government/label/add', data)

/**
 * 删除诉求标签
 * @param {*} data
 */
export const removeGovernmentLabel = (id) => remove(`/api/v1/government/label/delete/${id}`)

/**
 * 修改诉求标签
 * @param {*} data
 */
export const updateGovernmentLabel = (data) => put('/api/v1/government/label/update1', data)

/**
 * 获取诉求标签列表
 * @param {*} data
 */
export const getGovernmentLabelList = (data) => get('/api/v1/government/label/list', data)

// appeal-blacklist
/**
 * 新增企业进入诉求黑名单
 * @param {*} data
 */
export const createGovernmentBlackList = (data) => get('/api/v1/government/black/add', data)

/**
 * 将企业从诉求黑名单删除
 * @param {*} data
 */
export const removeGovernmentBlackList = (data) => remove(`/api/v1/government/black/remove`, data)

/**
 * 查询诉求黑名单列表
 * @param {*} data
 */
export const getGovernmentBlackList = (data) => get('/api/v1/government/black/list', data)

/**
 * 获取可被添加进黑名单的企业列表
 * @param {*} data
 */
export const getGovernmentAppealList = (data) => get('/api/v1/government/org/pagelist', data)

/**
 * 获取工作日志列表
 * @param {*} data
 */
export const getWorkLogList = (data) => get('/api/v1/government/workLog/logList', data)

/**
 * 工作日志导出excel
 * @param {*} data
 */
export const exportWorkLog = (data) => get('/api/v1/government/workLog/export', data, { responseType: 'blob' })

/**
 * 批量修改日志
 * @param data
 */
export const batchDetailLog = (data) => put('/api/v1/government/workLog/butchUpdate', data)

/**
 * 后端返回blob对象进行下载
 *  + axios 配置 responseType: 'blob'
 * @param {*} data
 * @param {*} fileName
 */
export const downloadFile = (data, fileName) => {
  const blob = new Blob([data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
  })
  const downloadElement = document.createElement('a')
  // 创建下载的链接
  const href = window.URL.createObjectURL(blob)
  downloadElement.href = href
  // 下载后文件名
  downloadElement.download = fileName
  document.body.appendChild(downloadElement)
  // 点击下载
  downloadElement.click()
  // 下载完成移除元素
  document.body.removeChild(downloadElement)
  // 释放掉blob对象
  window.URL.revokeObjectURL(href)
}

/**
 * 获取概览数据
 */
export const getAppealSurvey = () => get('/api/v1/government/appeal/appeal/survey')

/**
 * 获取街道
 */
export const getStreetList = () => get('/api/v1/common/street/getAll')

/**
 * 获取诉求统计数据
 * @params data
 */
export const getAppealComputed = (data) => get('/api/v1/government/overview/count', data)

/**
 * 获取所有领导标签
 */
export const getLeaderList = () => get('/api/v1/government/label/getAllLabel')
