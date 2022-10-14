<!-- 诉求标签 -->
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
          prop="labelName"
          label="标签">
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
        @current-change="getGovernmentLabelList">
      </el-pagination>
    </div>
  </div>

  <appealTagDialog
    v-model:show="isShowDialog"
    :dialog-tag="dialogTag"
    @on-reload="getGovernmentLabelList">
  </appealTagDialog>
</template>

<script setup>
  import { onMounted, reactive, ref } from 'vue'
  import { usePagination } from '@/utils/hooks'
  import * as apis from '@/apis/index'
  import { ElMessage, ElMessageBox } from 'element-plus'

  // 引入弹窗
  import appealTagDialog from './components/appeal-tag/appeal-tag-dialog.vue'

  // 显示新增dialog
  const isShowDialog = ref(false)

  // 传递给编辑弹窗的标签
  const dialogTag = ref()

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
    getGovernmentLabelList()
  })

  // 获取诉求标签列表
  const getGovernmentLabelList = () => {
    loading.value = true

    apis
      .getGovernmentLabelList({ ...pagination })
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
          removeGovernmentLabel(instance, done, row)
        } else {
          done()
        }
      }
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

  // 搜索
  const onSearch = () => {
    pagination.pageNum = 1
    //请求接口
    getGovernmentLabelList()
  }

  // 重置
  const onReset = () => {
    FormRef.value.resetFields()
    onSearch()
  }

  // 点击新增
  const onAdd = () => {
    resetDialogData()

    isShowDialog.value = true
  }

  // 点击编辑
  const onEdit = (row) => {
    resetDialogData()

    isShowDialog.value = true

    dialogTag.value = row.labelName
  }

  // 重置dialog的数据
  const resetDialogData = () => {
    dialogTag.value = null
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
