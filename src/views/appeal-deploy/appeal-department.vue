<!-- 诉求部门 -->
<template>
  <div class="tab_pane">
    <div class="tab_pane_header">
      <el-form
        ref="formRef"
        class="my-el-form-item-flex"
        :inline="true"
        :model="conditionForm">
        <el-row>
          <el-col :span="5">
            <el-form-item prop="departmentName">
              <el-input
                v-model="conditionForm.departmentName"
                placeholder="请输入部门名称搜索">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button
                type="primary"
                plain
                @click="onReset">
                重置
              </el-button>
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
          :index="indexMethod"
          type="index"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="street"
          label="街镇/部门名称">
        </el-table-column>
        <el-table-column
          prop="principal"
          label="服务专员">
        </el-table-column>
        <el-table-column
          prop="operate"
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

  <!-- 新增部门、编辑部门弹窗 -->
  <appealDepartmentDialog
    v-model:show="isShowDialog"
    :dialog-data="dialogData"
    @on-reload="getGovernmentDepList">
  </appealDepartmentDialog>
</template>

<script setup>
  import { onMounted, reactive, ref } from 'vue'
  import { usePagination } from '@/utils/hooks'
  import * as apis from '@/apis/index'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import appealDepartmentDialog from './components/appeal-department/appeal-department-dialog.vue'

  // 显示dialog
  const isShowDialog = ref(false)

  // 传入弹窗的数据
  const dialogData = ref({})

  // 表格加载图标
  const loading = ref(false)

  // 分页对象
  const { pagination, indexMethod } = usePagination()

  // 搜索条件
  const conditionForm = reactive({
    departmentName: ''
  })

  // 表单实例
  const formRef = ref(null)

  // 表格数据
  const tableData = ref([])

  // 初始化
  onMounted(() => {
    getGovernmentDepList()
  })

  // 点击搜索
  const onSearch = () => {
    pagination.pageNum = 1
    getGovernmentDepList()
  }

  // 点击重置
  const onReset = () => {
    formRef.value.resetFields()
    onSearch()
  }

  // 获取诉求部门列表
  const getGovernmentDepList = () => {
    loading.value = true

    apis
      .getGovernmentDepList({ ...conditionForm, ...pagination })
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

  // 点击新增
  const onAdd = () => {
    isShowDialog.value = true
    dialogData.value = null
  }

  // 点击编辑
  const onEdit = (row) => {
    isShowDialog.value = true
    dialogData.value = row
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
