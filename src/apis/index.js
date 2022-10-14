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

// appeal-department
/**
 * 创建诉求部门
 * @param {*} data
 */
export const createGovernmentDep = (data) => post('/api/v1/government/v1/add', data)

/**
 * 删除诉求部门
 * @param {*} data
 */
export const removeGovernmentDep = (id) => remove(`/api/v1/government/v1/delete/${id}`)

/**
 * 修改诉求部门
 * @param {*} data
 */
export const updateGovernmentDep = (data) => put('/api/v1/government/v1/update', data)

/**
 * 获取诉求部门列表
 * @param {*} data
 */
export const getGovernmentDepList = (data) => get('/api/v1/government/v1/list', data)

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
export const updateGovernmentLabel = (data) => put('', data)

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
export const createGovernmentBlackList = (data) => post('', data)

/**
 * 将企业从诉求黑名单删除
 * @param {*} data
 */
export const removeGovernmentBlackList = (id) => remove(`${id}`)

/**
 * 查询诉求黑名单列表
 * @param {*} data
 */
export const getGovernmentBlackList = (data) => get('', data)

//  * 获取工作日志编号:筛选未完成
//  */
export const getWorkLogList = (data) => get('/api/v1/government/workLog/logList', data)
