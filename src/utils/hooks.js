import { reactive } from 'vue'

/**
 * 分页对象及indexMethod
 * @returns
 */
export const usePagination = () => {
  // 分页对象
  const pagination = reactive({
    pageSize: 10,
    pageNum: 1,
    total: 0
  })
  // 序号函数
  const indexMethod = (index) => {
    return (pagination.pageNum - 1) * pagination.pageSize + index + 1
  }

  const paginationReset = (pageNum = 1, pageSize = 10) => {
    pagination.pageNum = pageNum
    pagination.pageSize = pageSize
    pagination.total = 0
  }

  return {
    pagination,
    indexMethod,
    paginationReset
  }
}

/**
 * 模拟表格数据
 * @param {*} obj
 * @param {*} count
 * @returns
 */
export const useMockTableData = (obj = {}, count = 10) => {
  const tableData = reactive([])

  for (let index = 0; index < count; index++) {
    tableData.push({
      id: index,
      ...obj
    })
  }

  return tableData
}

/**
 * 后退
 */
export const onBack = (router) => {
  window.history.length > 1 ? router.go(-1) : router.replace('/')
}

/**
 *  departmentName 部门
 *  handler 操作员
 *  handlerPhone 手机
 *  recordLabel 操作
 *  content 内容
 *  appealStatusString 状态
 *  enclosure附件
 */
