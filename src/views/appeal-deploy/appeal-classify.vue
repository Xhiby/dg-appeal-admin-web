<!-- 诉求分类 -->
<template>
  <div class="tab_pane">
    <div class="tab_pane_header">
      <el-form
        ref="FormRef"
        class="my-el-form-item-flex"
        size="default"
        :inline="true"
        :model="form">
        <el-row :gutter="8">
          <el-col :span="8">
            <el-form-item prop="childCategoryName">
              <el-input
                v-model="form.childCategoryName"
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
      <el-dropdown
        class="tw-mt-[20px]"
        @command="handleCommand">
        <el-button
          class="button"
          type="primary"
          size="default">
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
          width="74px"
          :index="indexMethod"
          type="index"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="appealType"
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

  <type-one-dialog
    v-model:show="typeOne"
    @on-reload="getCategoryChildList">
  </type-one-dialog>

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
  const loading = ref(false)
  // 分页对象
  const { pagination, indexMethod } = usePagination()
  // 搜索条件
  const form = reactive({
    childCategoryName: ''
  })
  const FormRef = ref(null)
  // getEvaluateList
  const tableData = ref([])
  //一级分类dialog
  const typeOne = ref(false)
  //二级分类dialog
  const typeTwo = ref(false)
  onMounted(() => {
    getCategoryChildList()
  })
  // 搜索
  const onSearch = () => {
    pagination.pageNum = 1
    //请求接口
    getCategoryChildList()
  }
  //请求列表数据
  const getCategoryChildList = () => {
    loading.value = true
    apis
      .getCategoryChildList({ ...form, ...pagination })
      .then((res) => {
        if (res.data.code === 0) {
          tableData.value = res.data.data.list
        } else {
          ElMessage.error(res.data.msg)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        loading.value = false
      })
  }

  //下拉菜单
  const handleCommand = (command) => {
    if (command === 'one') {
      typeOne.value = true
    } else {
      typeTwo.value = true
    }
  }

  // 重置
  const onReset = () => {
    FormRef.value.resetFields()
    onSearch()
  }

  // 点击删除
  const onDetail = () => {
    ElMessageBox({
      title: '确认',
      type: 'warning',
      message: '确认删除？',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      showCancelButton: true,
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          setTimeout(() => {
            ElMessage.success('删除成功')
            instance.confirmButtonLoading = false
            done()
          }, 2000)
        } else {
          done()
        }
      }
    }).catch((err) => {
      console.log(err)
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
