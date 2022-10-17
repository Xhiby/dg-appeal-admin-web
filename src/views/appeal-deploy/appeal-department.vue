<!-- 诉求部门 -->
<template>
  <div class="tab_pane">
    <div class="tab_pane_header">
      <el-form
        ref="FormRef"
        class="my-el-form-item-flex"
        size="default"
        :inline="true"
        :model="conditionForm">
        <el-row :gutter="8">
          <el-col :span="8">
            <el-form-item prop="keyword">
              <el-input
                v-model="conditionForm.keyword"
                placeholder="请输入类型名称搜索">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button @click="onReset"> 重置 </el-button>
              <el-button
                type="primary"
                @click="onSearch">
                查询
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <hr />
      <el-button
        class="tw-mt-[20px]"
        type="primary"
        size="default"
        @click="onAdd">
        新增
      </el-button>
    </div>
    <div class="tab_pane_content">
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        stripe
        row-class-name="my-el-table-stripe-row-name"
        header-cell-class-name="my-el-table-header-cell-name"
        style="width: 100%">
        <el-table-column
          width="74px"
          :index="indexMethod"
          type="index"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="departmentName"
          label="街镇/部门名称">
        </el-table-column>
        <el-table-column
          width="400px"
          prop="serviceCommissioner"
          label="服务专员">
        </el-table-column>
        <el-table-column
          prop="operate"
          width="180px"
          label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              text
              @click="onEdit(scope.row)">
              编辑
            </el-button>
            <el-button
              type="danger"
              text
              @click="onDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tab_pane_footer">
      <el-pagination
        v-model:currentPage="pagination.pageNum"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :page-sizes="[10, 20, 40, 60]"
        small
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSearch"
        @current-change="getGovernmentDepList">
      </el-pagination>
    </div>
  </div>

  <appealDepartmentDialog
    v-model:show="isShowDialog"
    :dialog-dep-name="dialogDepName"
    :dialog-service="dialogService"
    :dialog-service-list="dialogServiceList"
    @on-reload="getGovernmentDepList">
  </appealDepartmentDialog>
</template>

<script setup>
  import { onMounted, reactive, ref } from 'vue'
  import { usePagination } from '@/utils/hooks'
  import * as apis from '@/apis/index'
  import { ElMessage, ElMessageBox } from 'element-plus'

  // 引入弹窗组件
  import appealDepartmentDialog from './components/appeal-department/appeal-department-dialog.vue'

  // 显示dialog
  const isShowDialog = ref(false)
  // 街镇部门
  const dialogDepName = ref()
  // 服务专员
  const dialogService = ref()
  // 服务专员列表
  const dialogServiceList = ref()

  const loading = ref(false)
  // 分页对象
  const { pagination, indexMethod } = usePagination()

  // 搜索条件
  const conditionForm = reactive({
    keyword: ''
  })
  const FormRef = ref(null)
  // 表格数据
  const tableData = ref([])
  onMounted(() => {
    getGovernmentDepList()
  })
  // 搜索
  const onSearch = () => {
    pagination.pageNum = 1
    //请求接口
    getGovernmentDepList()
  }

  // 重置
  const onReset = () => {
    FormRef.value.resetFields()
    onSearch()
  }

  // 可被分配的服务专员列表
  const serviceList = reactive([
    {
      label: '专员1',
      value: '专员1'
    },
    {
      label: '专员2',
      value: '专员2'
    },
    {
      label: '专员3',
      value: '专员3'
    }
  ])

  // 点击新增
  const onAdd = () => {
    resetDialogData()

    dialogServiceList.value = serviceList

    isShowDialog.value = true
  }

  // 点击编辑
  const onEdit = (row) => {
    resetDialogData()

    isShowDialog.value = true

    dialogDepName.value = row.departmentName
    dialogService.value = row.serviceCommissioner

    dialogServiceList.value = serviceList
  }

  // 获取诉求部门列表
  const getGovernmentDepList = () => {
    loading.value = true

    apis
      .getGovernmentDepList({ ...pagination })
      .then((res) => {
        if (res.data.code === 0) {
          const { list, total, currentPage } = res.data.data

          pagination.pageNum = currentPage
          pagination.total = total
          tableData.value = list
        } else {
          ElMessage.error({ message: res.data.msg })
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        loading.value = false
      })
  }

  // 点击删除
  const onDelete = (row) => {
    ElMessageBox({
      title: '确定',
      type: 'warning',
      message: '确定删除?',
      confirmButtonClass: '确定',
      cancelButtonText: '取消',
      showCancelButton: true,
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          removeGovernmentDep(instance, done, row)
        } else {
          done()
        }
      }
    })
  }

  // 删除诉求部门
  const removeGovernmentDep = (instance, done, row) => {
    instance.confirmButtonLoading = true

    apis
      .removeGovernmentDep(row.id)
      .then((res) => {
        if (res.data.code === 0) {
          ElMessage.success('删除成功')

          getGovernmentDepList()
        } else {
          ElMessage.error({ message: res.data.msg })
        }
        done()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        instance.confirmButtonLoading = false
      })
  }

  // 重置dialog的数据
  const resetDialogData = () => {
    dialogDepName.value = null
    dialogService.value = null

    dialogServiceList.value = null
  }
</script>

<style lang="scss" scoped>
  .tab_pane {
    height: 100%;
    .tab_pane_header {
      margin-bottom: 20px;
    }
    .tab_pane_footer {
      width: 100%;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
</style>
