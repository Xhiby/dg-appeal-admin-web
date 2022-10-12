<!-- 日志管理 -->
<template>
  <div class="page_main">
    <PageTitle
      title="日志管理"
      class="tw-mb-[40px]">
    </PageTitle>
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
          size="large">
          导出
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
            prop="logCode"
            label="编号">
          </el-table-column>
          <el-table-column
            prop="companyName"
            show-overflow-tooltip
            label="企业名称">
          </el-table-column>
          <el-table-column
            prop="companyTheme"
            show-overflow-tooltip
            label="诉求主题">
          </el-table-column>
          <el-table-column
            prop="appealType"
            label="诉求分类">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="appealContent"
            label="诉求内容">
          </el-table-column>
          <el-table-column
            prop="appealStatus"
            label="诉求状态">
          </el-table-column>
          <el-table-column
            prop="transactor"
            label="办理人">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="logManage"
            label="日志记录">
          </el-table-column>
          <el-table-column
            prop="appealHandleTime"
            label="满意度">
          </el-table-column>
          <el-table-column
            prop="operate"
            label="操作">
            <template #default="scope">
              <el-button
                type="primary"
                text
                @click="onDetail(scope.row)">
                查看
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
  </div>
</template>

<script setup>
  import PageTitle from '@/components/page-title.vue'
  import { onMounted, reactive, ref } from 'vue'
  import { usePagination } from '@/utils/hooks'
  import { useMockTableData } from '@/utils/hooks'

  const loading = ref(false)
  // 分页对象
  const { pagination } = usePagination()

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
        logCode: '9527',
        companyName: '米哈游',
        companyTheme: '德古拉',
        appealType: '投诉电话',
        appealContent: 'RNM退钱',
        appealStatus: '良好',
        transactor: '赵师傅',
        logManage: '今天的太阳可真圆啊',
        appealHandleTime: '非常差'
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
</script>

<style lang="scss" scoped>
  .page_main {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 15px 20px;
    overflow: auto;
  }
</style>
