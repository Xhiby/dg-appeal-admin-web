import { get, post, put } from './config'

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
