<!-- 诉求黑名单 -->
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
            <el-form-item prop="keyword">
              <el-input
                v-model="conditionForm.keyword"
                placeholder="请输入单位名称搜索"
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
        :border="true"
        :data="tableData"
        stripe
        row-class-name="my-el-table-stripe-row-name"
        header-cell-class-name="my-el-table-header-cell-name"
        style="width: 100%">
        <el-table-column
          width="115"
          :index="indexMethod"
          type="index"
          label="序号">
        </el-table-column>
        <el-table-column
          width="320px"
          prop="companyName"
          label="单位名称">
        </el-table-column>
        <el-table-column
          prop="directorName"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          width="200px"
          prop="position"
          label="职务">
        </el-table-column>
        <el-table-column
          width="120px"
          prop="mobile"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="operate"
          label="操作">
          <template #default="scope">
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
        @current-change="getGovernmentBlackList">
      </el-pagination>
    </div>
  </div>

  <!-- 新增黑名单弹窗 -->
  <appealBlackListDialog
    v-model:show="isShowDialog"
    @on-reload="getGovernmentBlackList">
  </appealBlackListDialog>
</template>

<script setup>
  import { onMounted, reactive, ref } from 'vue'
  import { usePagination } from '@/utils/hooks'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import * as apis from '@/apis/index'

  // 添加黑名单组件
  import appealBlackListDialog from './components/appeal-blacklist/appeal-blacklist-dialog.vue'

  // 显示dialog
  const isShowDialog = ref(false)

  // 表格加载图标
  const loading = ref(false)

  // 分页对象
  const { pagination, indexMethod } = usePagination()

  // 搜索条件
  const conditionForm = reactive({
    keyword: ''
  })

  // 表单实例
  const formRef = ref(null)

  // 表格数据
  const tableData = ref([])

  // 初始化
  onMounted(() => {
    getGovernmentBlackList()
  })

  // 搜索
  const onSearch = () => {
    pagination.pageNum = 1
    getGovernmentBlackList()
  }

  // 点击重置
  const onReset = () => {
    formRef.value.resetFields()
    onSearch()
  }

  // 点击删除
  const onDelete = (row) => {
    ElMessageBox({
      title: '确认',
      type: 'warning',
      message: '确认删除？',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      showCancelButton: true,
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          removeGovernmentBlackList(instance, done, row)
        } else {
          done()
        }
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  // 点击新增
  const onAdd = () => {
    isShowDialog.value = true
  }

  //请求列表数据
  const getGovernmentBlackList = () => {
    loading.value = true

    apis
      .getGovernmentBlackList({ ...conditionForm, ...pagination })
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
      .catch((err) => console.log(err))
      .finally(() => {
        loading.value = false
      })
  }

  // 将企业从诉求黑名单中删除
  const removeGovernmentBlackList = (instance, done, row) => {
    instance.confirmButtonLoading = true

    apis
      .removeGovernmentBlackList({ ids: row.id })
      .then((res) => {
        if (res.data.code === 0) {
          console.log(res.data)
          ElMessage.success('删除成功')

          getGovernmentBlackList()
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
