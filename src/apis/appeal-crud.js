import { get, post, put, remove } from './config'

/**
 * 诉求列表
 * @param params
 */
export const getAppeals = (params) => get(`/api/v1/government/appeal/list`, params)

/**
 * 诉求类型一级列表
 * @param params
 */
export const getAppealCategories = (params) => get(`/api/v1/government/category/getCategory`, params)

/**
 * 诉求类型级联列表
 * @param params
 */
export const getAllAppealCategories = (params) => get(`/api/v1/government/category/getAll`, params)

/**
 * 诉求标签
 * @param params
 */
export const getAppealsLabels = (params) => get(`/api/v1/government/label/getAllLabel`, params)

/**
 * 诉求标签
 * @param params
 */
export const applyAppeal = (params) => post(`/api/v1/government/appeal/add`, params)

/**
 * 代理诉求企业列表
 * @param params
 */
export const getAppealsOrgan = (params) => get(`/api/v1/government/org/list`, params)

/**
 * 代理诉求详情
 * @param sid
 */
export const getAppealsDetails = (sid) => get(`/api/v1/government/appeal/detail/${sid}`)

/**
 * 获取列表详情
 * @id id
 */
export const getAppealDetail = (id) => get(`/api/v1/government/appeal/detail/${id}`)

/**
 * 拆分诉求
 * @id id
 */
export const splitAppeal = (params) => put(`/api/v1/government/appeal/signSpilt`, params)

/**
 * 编辑诉求
 * @id id
 */
export const editAppeal = (params) => put(`/api/v1/government/appeal/bzbHandle`, params)

/**
 * 领导处理诉求
 * @id id
 */
export const editAppealByLeader = (params) => put(`/api/v1/government/appeal/bzbHandle`, params)

/**
 * 获取所有部门
 * @id id
 */
export const getAllDepartment = (params) => get(`/api/v1/government/department/getAll`, params)

/**
 * 诉求签收
 * @id id
 */
export const signAppeal = (params) => put(`/api/v1/government/appeal/signAppeal`, params)

/**
 *  标记诉求
 * @id id
 */
export const markAppeal = (params) => put(`/api/v1/government/appeal/sign`, params)

/**
 *  诉求阶段性总结
 * @id id
 */
export const progressSummary = (params) => put(`/api/v1/government/appeal/summary`, params)

/**
 *  删除诉求
 * @id id
 */
export const removeAppeal = (id) => remove(`/api/v1/government/appeal/delete/${id}`)
