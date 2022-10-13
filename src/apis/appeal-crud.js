import { get} from './config'

/**
 * 诉求列表
 * @param params
 */
export const getAppeals = (params) => get(`/api/v1/government/appeal/list`, params)
