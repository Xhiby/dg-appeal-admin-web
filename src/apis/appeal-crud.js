import { get } from './config'

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
