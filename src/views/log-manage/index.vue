<!-- 日志管理 -->
<template>
  <div style="padding: 20px">
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
            size="default"
            :inline="true"
            label-width="90px"
            label-position="left"
            :model="logForm">
            <el-row :gutter="2">
              <el-col :span="8">
                <el-form-item
                  label="关键字搜索:"
                  prop="keyword">
                  <el-input
                    v-model="logForm.keyword"
                    placeholder="请输入诉求主题/企业名称/诉求编号">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="办理人:"
                  prop="transactors">
                  <el-input
                    v-model="logForm.transactors"
                    placeholder="办理人">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  prop="childCategoryCode"
                  label="诉求分类:">
                  <el-cascader
                    v-model="logForm.childCategoryCode"
                    class="tw-flex-1"
                    :options="appealTypeList"
                    placeholder="诉求分类"
                    @change="handleChange">
                  </el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  prop="updateAt"
                  label="更新时间:">
                  <el-date-picker
                    v-model="logForm.updateAt"
                    type="daterange"
                    class="tw-w-full"
                    range-separator="至"
                    value-format="YYYY-MM-DD"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="请选择更新时间"
                    @change="onUpdateChange">
                  </el-date-picker>
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
            @click="exportLog">
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
              show-overflow-tooltip
              width="100px"
              prop="appealCode"
              label="编号">
            </el-table-column>
            <el-table-column
              prop="organizationName"
              show-overflow-tooltip
              label="企业名称">
            </el-table-column>
            <el-table-column
              prop="appealTheme"
              show-overflow-tooltip
              label="诉求主题">
            </el-table-column>
            <el-table-column
              prop="appealChildCategoryName"
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
              <template #default="{ row }">
                <!-- success info warning danger-->
                <el-tag :type="tagType(row.appealStatus).type"> {{ tagType(row.appealStatus).status }} </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="principle"
              label="办理人">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="workLogs"
              label="日志记录">
              <template #default="scope">
                <p
                  v-for="(item, index) in scope.row.workLogs"
                  :key="index">
                  {{ item.logContent }}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="满意度">
              <template #default="{ row }">
                <el-rate
                  v-model="row.commentScore"
                  :max="3"
                  disabled>
                </el-rate>
              </template>
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
            @current-change="getWorkLogList">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>

  <!-- dialog -->
  <log-dialog
    v-model:show="isShow"
    :to-dialog="toDialog"
    @on-reload="onSearch">
  </log-dialog>
</template>

<script setup>
  import PageTitle from '@/components/page-title.vue'
  import { computed, onMounted, reactive, ref } from 'vue'
  import { usePagination } from '@/utils/hooks'
  import logDialog from './components/log-dialog.vue'
  import * as apis from '@/apis/index'
  import { ElMessage } from 'element-plus'

  const loading = ref(false)
  // 分页对象
  const { pagination } = usePagination()
  //诉求分类
  // 搜索条件
  const logForm = reactive({
    keyword: '',
    transactors: '',
    childCategoryCode: '',
    updateAt: [],
    startTime: '',
    endTime: ''
  })
  const FormRef = ref(null)
  // 表格数据
  const tableData = ref([])
  // 控制dialog
  const isShow = ref(false)
  // 传输给dialog数据
  const toDialog = ref(null)
  //诉求分类
  const appealTypeList = ref([])
  // 标签类型
  const tagType = computed(() => {
    let info = {}
    return (status) => {
      switch (status) {
        case -1:
          info.status = '失效'
          info.type = 'info'
          return info
        case 0:
          info.status = '待处理'
          info.type = 'warning'
          return info
        case 1:
          info.status = '推进中'
          info.type = ''
          return info
        case 2:
          info.status = '待评价'
          info.type = ''
          return info
        case 3:
          info.status = '已完结'
          info.type = 'success'
          return info
      }
    }
  })
  onMounted(() => {
    getCategoryList()
    getWorkLogList()
  })
  // 搜索
  const onSearch = () => {
    pagination.pageNum = 1
    getWorkLogList()
  }
  const getWorkLogList = () => {
    loading.value = true
    //请求接口
    apis
      .getWorkLogList({ ...logForm, ...pagination })
      .then((res) => {
        if (res.data.code === 0) {
          const { currentPage, total, list } = res.data.data
          tableData.value = list
          pagination.pageNum = currentPage
          pagination.total = total
        } else {
          ElMessage.error(res.data.msg)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        loading.value = false
      })
  }
  //获取诉求分类列表
  const getCategoryList = () => {
    apis
      .getCategoryList()
      .then((res) => {
        if (res.data.code === 0) {
          appealTypeList.value = convertCategoryList(res.data.data)
        } else {
          ElMessage.error(res.data.msg)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {})
  }
  // 转换诉求分类列表
  const convertCategoryList = (data) => {
    console.log('data', data)
    const res = []

    for (const i in data) {
      res[i] = {}
      res[i].label = data[i].categoryName
      res[i].value = data[i].categoryCode

      if (data[i].children !== []) {
        res[i].children = convertCategoryList(data[i].children)
      }
    }

    return res
  }
  // 级联选择器change事件
  const handleChange = (value) => {
    // 选择后默认为一级和二级的ID 改为仅需要二级ID
    logForm.childCategoryCode = value[1]
  }
  // 重置
  const onReset = () => {
    logForm.startTime = ''
    logForm.endTime = ''
    FormRef.value.resetFields()
    pagination.pageNum = 1
    getWorkLogList()
  }
  // 查看列表数据
  const onDetail = (row) => {
    toDialog.value = {
      name: '李某人',
      workLogs: row.workLogs
    }
    isShow.value = true
  }
  const exportLog = () => {
    apis
      .exportWorkLog()
      .then((res) => {
        console.log(res)
        apis.downloadFile(res, '日志管理')
      })
      .catch((err) => console.log(err))
      .finally(() => {})
  }

  const onUpdateChange = (arr) => {
    logForm.startTime = arr[0]
    logForm.endTime = arr[1]
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
      margin-top: 20px;
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
