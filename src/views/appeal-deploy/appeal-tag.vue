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
          prop="tag"
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
        @current-change="getEvaluateList">
      </el-pagination>
    </div>
  </div>

  <appealTagDialog
    v-model:show="isShowDialog"
    :dialog-tag="dialogTag">
  </appealTagDialog>
</template>

<script setup>
  import { onMounted, reactive, ref } from 'vue'
  import { usePagination } from '@/utils/hooks'
  import { useMockTableData } from '@/utils/hooks'

  import { ElMessage, ElMessageBox } from 'element-plus'

  // 引入弹窗组件
  import appealTagDialog from './components/appeal-tag/appeal-tag-dialog.vue'

  // 显示dialog
  const isShowDialog = ref(false)
  // 标签
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
    tableData.value = useMockTableData(
      {
        tag: '市领导关注（张局长）'
      },
      25
    )
  })
  // 搜索
  const onSearch = () => {
    pagination.pageNum = 1
    //请求接口
  }
  //请求列表数据
  const getEvaluateList = () => {}
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

    dialogTag.value = row.tag
  }

  // 点击删除
  const onDelete = () => {
    ElMessageBox({
      title: '确定',
      type: 'warning',
      message: '确定删除?',
      confirmButtonClass: '确定',
      cancelButtonText: '取消',
      showCancelButton: true,
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          setTimeout(() => {
            ElMessage.success('删除成功')
            instance.confirmButtonLoading = false
            done()
          }, 500)
        } else {
          done()
        }
      }
    })
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
