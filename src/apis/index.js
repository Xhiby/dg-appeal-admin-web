import { baseUrl, post, upload, get } from './config'

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
 * 创建诉求标签
 * @param {*} data
 */
export const createGovernment = (data) => post('/api/v1/government/label/add', data)

/**
 * 获取标签列表
 * @param {*} data
 */
export const getGovernmentList = (data) => post('/api/v1/government/label/all', data)

/**
 * 获取诉求分类列表
 * @param {*} data
 */
export const getCategoryList = (data) => get('/api/v1/government/category/getCategory', data)

/**
 * 获取诉求标签列表
 * @param {*} data
 */
export const getGovernmentLabelList = (data) => get('/api/v1/government/label/getAllLabel', data)

/**
 * 创建诉求标签
 * @param {*} data
 */
export const createGovernmentLabel = (data) => post('/api/v1/government/label/add', data)
/**
 * 获取工作日志列表
 * @param {*} data
 */
export const getWorkLogList = (data) => get('/api/v1/government/workLog/logList', data)
