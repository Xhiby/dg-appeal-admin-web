<!-- 诉求分类 -->
<template>
  <div class="tab_pane">
    <div class="tab_pane_header">
      <el-form
        ref="formRef"
        class="my-el-form-item-flex"
        :inline="true"
        :model="form"
        @submit.prevent>
        <el-row>
          <el-col :span="5">
            <el-form-item prop="childCategoryName">
              <el-input
                v-model="form.childCategoryName"
                placeholder="请输入子类名称搜索"
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
      <el-dropdown
        class="tw-mt-[20px]"
        @command="handleCommand">
        <el-button
          class="button"
          type="primary">
          新增<el-icon class="el-icon--right"><arrow-down></arrow-down></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="one">一级分类</el-dropdown-item>
            <el-dropdown-item command="two">二级分类</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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
          prop="childCategoryCode"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="诉求分类">
        </el-table-column>
        <el-table-column
          prop="childCategoryName"
          label="诉求子类">
        </el-table-column>
        <el-table-column
          prop="appealSignLimitTime"
          label="诉求签收时限">
        </el-table-column>
        <el-table-column
          prop="appealEvaluateLimitTime"
          label="评价时限">
        </el-table-column>
        <el-table-column
          prop="appealHandleLimitTime"
          label="诉求处理时限">
        </el-table-column>
        <el-table-column
          prop="operate"
          label="操作">
          <template #default="scope">
            <el-button
              type="danger"
              text
              @click="onDetail(scope.row)">
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
        @current-change="getCategoryChildList">
      </el-pagination>
    </div>
  </div>

  <!-- 新增一级分类弹窗 -->
  <type-one-dialog
    v-model:show="typeOne"
    @on-reload="getCategoryChildList">
  </type-one-dialog>

  <!-- 新增二级分类弹窗 -->
  <type-two-dialog
    v-model:show="typeTwo"
    @on-reload="getCategoryChildList">
  </type-two-dialog>
</template>

<script setup>
  import { onMounted, reactive, ref } from 'vue'
  import { usePagination } from '@/utils/hooks'
  import typeOneDialog from './components/appeal-classify/type-one-dialog.vue'
  import typeTwoDialog from './components/appeal-classify/type-two-dialog.vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import * as apis from '@/apis/index'

  // 表格加载图标
  const loading = ref(false)

  // 分页对象
  const { pagination } = usePagination()

  // 搜索条件
  const form = reactive({
    childCategoryName: ''
  })

  // 表单实例
  const formRef = ref(null)

  // 表格数据
  const tableData = ref([])

  //一级分类dialog
  const typeOne = ref(false)

  //二级分类dialog
  const typeTwo = ref(false)

  // 初始化
  onMounted(() => {
    getCategoryChildList()
  })

  // 下拉菜单
  const handleCommand = (command) => {
    if (command === 'one') {
      typeOne.value = true
    } else {
      typeTwo.value = true
    }
  }

  // 点击搜索
  const onSearch = () => {
    pagination.pageNum = 1
    getCategoryChildList()
  }

  // 点击重置
  const onReset = () => {
    formRef.value.resetFields()
    onSearch()
  }

  // 点击删除
  const onDetail = (row) => {
    ElMessageBox({
      title: '确认',
      type: 'warning',
      message: '确认删除？',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      showCancelButton: true,
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          removeCategoryChild(instance, done, row)
        } else {
          done()
        }
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  //请求列表数据
  const getCategoryChildList = () => {
    loading.value = true
    apis
      .getCategoryChildList({ ...form, ...pagination })
      .then((res) => {
        if (res.data.code === 0) {
          const { list, total, currentPage } = res.data.data
          tableData.value = list
          pagination.total = total
          pagination.pageNum = currentPage
        } else {
          ElMessage.error(res.data.msg)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        loading.value = false
      })
  }

  // 删除诉求子类
  const removeCategoryChild = (instance, done, row) => {
    instance.confirmButtonLoading = true

    apis
      .removeCategoryChild(row.id)
      .then((res) => {
        if (res.data.code === 0) {
          console.log(res.data)
          ElMessage.success('删除成功')

          getCategoryChildList()
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
