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
          :model="logForm">
          <el-row :gutter="2">
            <el-col :span="4">
              <el-form-item prop="code">
                <el-input
                  v-model="logForm.code"
                  placeholder="请输入诉求主题/企业名称/诉求编号">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="people">
                <el-select
                  v-model="logForm.people"
                  placeholder="办理人">
                  <el-option
                    v-for="(item, index) in peopleList"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="type">
                <el-select
                  v-model="logForm.type"
                  placeholder="诉求分类">
                  <el-option
                    v-for="(item, index) in appealTypeList"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="time">
                <el-input
                  v-model="logForm.time"
                  placeholder="更新时间">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
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
            <template #default="scope">
              <el-tag>{{ scope.row.appealStatus }}</el-tag>
            </template>
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
  import { appealTypeList } from '@/config/global-var.js'

  const loading = ref(false)
  // 分页对象
  const { pagination } = usePagination()

  // 办理人
  const peopleList = reactive([
    {
      label: '办理人',
      value: 0
    },
    {
      label: '张三',
      value: 1
    },
    {
      label: '李四',
      value: 2
    }
  ])
  //诉求分类
  // 搜索条件
  const logForm = reactive({
    code: '',
    people: '',
    type: '',
    time: ''
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

    .tab_pane_content {
      margin-top: 33px;
      border-top: 1px solid #dcdfe6;

      .button {
        margin-top: 20px;
        margin-bottom: 33px;
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
