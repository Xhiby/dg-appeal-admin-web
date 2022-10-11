import { baseUrl, post, upload } from './config'

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
