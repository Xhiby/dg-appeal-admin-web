import { get, post, put } from './config'

/**
 * 诉求列表
 * @param params
 */
export const getAppeals = (params) => get(`/api/v1/government/appeal/list`, params)

/**
 * 诉求类型列表
 * @param params
 */
export const getAppealCategories = (params) => get(`/api/v1/government/category/getChildCategory`, params)

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
export const getAppealsOrgan = (params) => get(`/api/v1/organization/appeal/list`, params)

/**
 * 获取列表详情
 * @id id
 */
export const getAppealDetail = (id) => put(`/api/v1/government/appeal/detail/${id}`)
