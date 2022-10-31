<!-- 诉求标签 -->
<template>
  <div class="tab_pane">
    <div class="tab_pane_header">
      <el-form
        ref="formRef"
        class="my-el-form-item-flex"
        :inline="true"
        :model="conditionForm"
        @submit.prevent>
        <el-row>
          <el-col :span="5">
            <el-form-item prop="labelName">
              <el-input
                v-model="conditionForm.labelName"
                placeholder="请输入标签名称搜索"
                @keyup.enter="onSearch()">
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
          prop="labelCode"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="labelName"
          label="标签">
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
        @current-change="getGovernmentLabelList">
      </el-pagination>
    </div>
  </div>

  <!-- 新增标签、编辑标签弹窗 -->
  <appealTagDialog
    v-model:show="isShowDialog"
    :dialog-data="dialogData"
    @on-reload="getGovernmentLabelList">
  </appealTagDialog>
</template>

<script setup>
  import { onMounted, reactive, ref } from 'vue'
  import { usePagination } from '@/utils/hooks'
  import * as apis from '@/apis/index'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import appealTagDialog from './components/appeal-tag/appeal-tag-dialog.vue'

  // 显示dialog
  const isShowDialog = ref(false)

  // 传入弹窗的数据
  const dialogData = ref({})

  // 表格加载图标
  const loading = ref(false)

  // 分页对象
  const { pagination, paginationReset } = usePagination()

  // 搜索条件
  const conditionForm = reactive({
    labelName: ''
  })

  // 表单实例
  const formRef = ref(null)

  // 表格数据
  const tableData = ref([])

  // 初始化
  onMounted(() => {
    getGovernmentLabelList()
  })

  // 点击搜索
  const onSearch = () => {
    paginationReset(pagination.pageSize)
    getGovernmentLabelList()
  }

  // 点击重置
  const onReset = () => {
    formRef.value.resetFields()
    onSearch()
  }

  // 点击新增
  const onAdd = () => {
    resetDialogData()
    isShowDialog.value = true
  }

  // 点击编辑
  const onEdit = (row) => {
    isShowDialog.value = true
    dialogData.value = row
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
          removeGovernmentLabel(instance, done, row)
        } else {
          done()
        }
      }
    })
  }

  // 获取诉求标签列表
  const getGovernmentLabelList = () => {
    loading.value = true

    apis
      .getGovernmentLabelList({ ...conditionForm, ...pagination })
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

  // 删除诉求标签
  const removeGovernmentLabel = (instance, done, row) => {
    instance.confirmButtonLoading = true

    apis
      .removeGovernmentLabel(row.id)
      .then((res) => {
        if (res.data.code === 0) {
          ElMessage.success('删除成功')
          getGovernmentLabelList()
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
    dialogData.value = null
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
