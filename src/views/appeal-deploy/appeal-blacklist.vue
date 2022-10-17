<!-- 诉求黑名单 -->
<template>
  <div class="tab_pane">
    <div class="tab_pane_header">
      <el-form
        ref="FormRef"
        class="my-el-form-item-flex"
        size="default"
        :inline="true"
        :model="conditionForm">
        <el-form-item
          prop="keyword"
          class="tw-mr-[18px]">
          <el-input
            v-model="conditionForm.keyword"
            class="tw-w-[240px]"
            placeholder="请输入类型名称搜索">
          </el-input>
        </el-form-item>
        <el-form-item class="tw-mr-[16px]">
          <el-button
            type="primary"
            plain
            @click="onReset">
            重置
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSearch">
            查询
          </el-button>
        </el-form-item>
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
        :border="true"
        :data="tableData"
        stripe
        row-class-name="my-el-table-stripe-row-name"
        header-cell-class-name="my-el-table-header-cell-name"
        style="width: 100%">
        <el-table-column
          width="114"
          :index="indexMethod"
          type="index"
          label="序号">
        </el-table-column>
        <el-table-column
          width="460"
          prop="companyName"
          label="单位名称">
        </el-table-column>
        <el-table-column
          width="180"
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          width="92"
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          width="348"
          prop="position"
          label="职务">
        </el-table-column>
        <el-table-column
          width="250"
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="operate"
          width="167"
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

  <appealBlackListDialog v-model:show="isShowDialog"> </appealBlackListDialog>
</template>

<script setup>
  import { onMounted, reactive, ref } from 'vue'
  import { usePagination } from '@/utils/hooks'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import * as apis from '@/apis/index'

  // 引入弹窗组件
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
  const FormRef = ref(null)
  // 表格数据
  const tableData = ref([])
  onMounted(() => {
    getGovernmentBlackList()
  })

  // 搜索
  const onSearch = () => {
    pagination.pageNum = 1
    //请求接口
    getGovernmentBlackList()
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

  // 重置
  const onReset = () => {
    FormRef.value.resetFields()
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

  // 将企业从诉求黑名单中删除
  const removeGovernmentBlackList = (instance, done, row) => {
    instance.confirmButtonLoading = true

    const deleteId = { ids: row.id }

    apis
      .removeGovernmentBlackList(deleteId)
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

  // 点击新增
  const onAdd = () => {
    isShowDialog.value = true
  }
</script>

<style lang="scss" scoped>
  .tab_pane {
    height: 100%;
    .tab_pane_header {
      margin-bottom: 20px;
      .my-el-form-item-flex {
        display: flex;
      }
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
