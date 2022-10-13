<!-- 诉求分类 -->
<template>
  <div class="tab_pane">
    <div class="tab_pane_header">
      <el-form
        ref="FormRef"
        class="my-el-form-item-flex"
        size="large"
        :inline="true"
        :model="conditionForm">
        <el-row :gutter="8">
          <el-col :span="4">
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
    </div>
    <div class="tab_pane_content">
      <el-button
        class="button"
        type="primary"
        size="large"
        @click="onAdd">
        新增
      </el-button>
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
          prop="appealSubType"
          label="诉求子类">
        </el-table-column>
        <el-table-column
          prop="appealSignTime"
          label="诉求签收时限">
        </el-table-column>
        <el-table-column
          prop="evaluateTime"
          label="评价时限">
        </el-table-column>
        <el-table-column
          prop="appealHandleTime"
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
        @current-change="getEvaluateList">
      </el-pagination>
    </div>
  </div>

  <!-- 新增分类 -->
  <appealClassifyAdd
    v-model:dialog-info="dialogStatus"
    @show="switchDialog(isShow)">
  </appealClassifyAdd>
</template>

<script setup>
  import { onMounted, reactive, ref } from 'vue'
  import { usePagination } from '@/utils/hooks'
  import { useMockTableData } from '@/utils/hooks'

  // 引入弹窗组件
  import appealClassifyAdd from './components/appeal-classify/appeal-classify-add.vue'


  // 

  // 弹窗相关
  const dialogStatus = reactive({
    // 是否显示
    show: false
  })

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
        appealType: '诉求分类',
        appealSubType: '诉求子类',
        appealSignTime: '诉求签收时限',
        evaluateTime: '评价时限',
        appealHandleTime: '诉求处理时限'
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
    switchDialog(true)
  }

  //切换dialog
  const switchDialog = (isShow) => {
    dialogStatus.show = isShow
  }

  // 点击删除
  const onDetail = () => {}
</script>

<style lang="scss" scoped>
  .tab_pane {
    height: 100%;
    .tab_pane_header {
      margin-bottom: 20px;
    }
    .tab_pane_content {
      border-top: 1px solid #dcdfe6;
      .button {
        margin-top: 20px;
        margin-bottom: 34px;
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
