<template>
  <div
    ref="containerRef"
    class="tw-bg-white tw-overflow-x-hidden tw-overflow-y-auto tw-h-full tw-relative">
    <div ref="headerRef">
      <div class="tw-w-full tw-flex tw-justify-between tw-items-center">
        <page-title title="诉求列表"></page-title>
      </div>
      <el-tabs
        v-model="activeAppealCategory"
        class="my-el-tabs tw-mt-[19px]"
        @tab-change="handleAppealCategoryChange">
        <el-tab-pane
          label="全部"
          name="">
        </el-tab-pane>
        <el-tab-pane
          label="待处理"
          name="0">
        </el-tab-pane>
        <el-tab-pane
          label="推进中"
          name="1">
        </el-tab-pane>
        <el-tab-pane
          label="待评价"
          name="2">
        </el-tab-pane>
        <el-tab-pane
          label="已完结"
          name="3">
        </el-tab-pane>
        <el-tab-pane
          label="失效"
          name="-1">
        </el-tab-pane>
      </el-tabs>
      <div class="form-search tw-w-full tw-mt-[15px]">
        <el-form
          ref="formSearchRef"
          label-position="left"
          label-width="90px"
          class="my-el-form-item-flex tw-mb-[12px]"
          :inline="true"
          :model="formSearchData">
          <el-row :gutter="8">
            <el-col :span="8">
              <el-form-item label="评价搜索:">
                <el-input
                  v-model="formSearchData.keyword"
                  class="tw-w-full"
                  placeholder="请输入诉求主题/企业名称/诉求编号">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属街镇:">
                <el-select
                  v-model="formSearchData.streetId"
                  class="tw-w-full"
                  placeholder="请选择所属街镇"
                  @change="handleStreetChange">
                  <el-option
                    v-for="item in streetList"
                    :key="item.streetId"
                    :label="item.street"
                    :value="item.streetId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="请求来源:">
                <el-select
                  v-model="formSearchData.appealSource"
                  class="tw-w-full"
                  placeholder="请选择请求来源"
                  @change="handleStreetChange">
                  <el-option
                    v-for="(item, index) in appealSourceList"
                    :key="index"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="8">
            <el-col :span="8">
              <el-form-item label="诉求分类:">
                <el-cascader
                  v-model="formSearchData.categoryChildCode"
                  class="tw-flex-1"
                  :options="appealList"
                  :show-all-levels="false"
                  @change="handleChange">
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="市领导关注:">
                <el-select
                  v-model="formSearchData.appealLabelCode"
                  class="tw-flex-1"
                  placeholder="请选择领导标签">
                  <el-option
                    v-for="item in appealsLabels"
                    :key="item.labelCode"
                    :label="item.labelName"
                    :value="item.labelCode">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="更新时间:">
                <el-date-picker
                  v-model="formSearchData.updatedTime"
                  type="date"
                  class="tw-w-full"
                  value-format="YYYY-MM-DD"
                  placeholder="请选择上架时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="8">
            <el-col :span="8">
              <el-form-item label="提交时间:">
                <el-date-picker
                  v-model="formSearchData.submitTime"
                  type="date"
                  class="tw-w-full"
                  value-format="YYYY-MM-DD"
                  placeholder="请选择上架时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button @click="handleReset"> 重置 </el-button>
                <el-button
                  type="primary"
                  @click="handleSearch">
                  查询
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-divider></el-divider>
      <div class="tw-w-[200px] tw-flex tw-items-center tw-justify-start">
        <el-button
          type="primary"
          @click="handleProxyCommit">
          代理提交
        </el-button>
        <el-button
          type="primary"
          @click="handleExport">
          导出
        </el-button>
        <el-button
          v-if="commonStore.role === '市倍增办'"
          type="primary"
          @click="handleGenerateReport">
          生成简报
        </el-button>
      </div>
    </div>
    <div class="tw-mt-[20px]">
      <el-table
        v-loading="loading"
        class="tw-w-full"
        border
        stripe
        row-class-name="my-el-table-stripe-row-name"
        header-cell-class-name="my-el-table-header-cell-name"
        :data="appealTableData"
        :height="containerHeight - headerHeight - 80">
        <el-table-column
          show-overflow-tooltip
          label="编号"
          width="120px">
          <template #default="scope">
            <el-tooltip
              v-if="scope.row.appealStatus !== -1 && scope.row.appealStatus !== 3 && scope.row.appealSign !== null"
              placement="right-start"
              :content="scope.row.appealSign">
              <img
                src="../../../assets/images/appeal-list/icon_warn@2x.png"
                class="tw-w-[14px] tw-h-[14px] tw-inline-block"
                alt="" />
            </el-tooltip>
            {{ scope.row.appealCode }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="street"
          label="街镇"
          width="100px">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="organizationName"
          label="企业名称"
          width="220px">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="appealTheme"
          label="诉求主题"
          width="220px">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="appealContent"
          label="诉求内容"
          width="180px">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="appealChildCategoryName"
          label="诉求分类"
          width="180px">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="诉求状态"
          width="120px">
          <template #default="scope">
            <div
              v-if="scope.row.appealStatus === -1"
              class="tw-text-[14px] tw-text-[#FF8F00]">
              失效
            </div>
            <div
              v-if="scope.row.appealStatus === 0"
              class="tw-text-[14px] tw-text-[#FF8F00]">
              待处理
            </div>
            <div
              v-if="scope.row.appealStatus === 1"
              class="tw-text-[14px] tw-text-[#4584F8]">
              推进中
            </div>
            <div
              v-if="scope.row.appealStatus === 2"
              class="tw-text-[14px] tw-text-[#57D3A2]">
              待评价
            </div>
            <div
              v-if="scope.row.appealStatus === 3"
              class="tw-text-[14px] tw-text-[#57D3A2]">
              已完结
            </div>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="createdAt"
          label="创建时间"
          width="180px">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="appealLabelName"
          label="关注标签"
          width="150px">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template #default="scope">
            <el-button
              class="tw-text-[14px]"
              link
              type="primary"
              size="small"
              @click="handleShowAppealDetails(scope.row)">
              查看
            </el-button>
            <el-button
              class="tw-text-[14px] tw-text-[#57D3A2]"
              link
              size="small"
              @click="handleDeleteAppeal(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:currentPage="paginator.pageNum"
        v-model:page-size="paginator.pageSize"
        class="tw-mt-[20px] tw-flex tw-flex-1 tw-justify-end"
        :page-sizes="[10, 20, 50, 100]"
        :small="false"
        :background="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginator.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script setup>
  import PageTitle from '@/components/page-title.vue'
  import { useElementSize } from '@vueuse/core'
  import { useRouter } from 'vue-router'
  import { onMounted, reactive, ref, toRaw } from 'vue'
  import { getAppeals, removeAppeal } from '@/apis/appeal-crud'
  import { useCommonStore } from '@/stores/common'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import * as apis from '@/apis/index'
  import { getAppealsLabels } from '@/apis/appeal-crud'
  import { appealSourceList } from '@/config/global-var'

  const loading = ref(false)
  const containerRef = ref(null)
  const headerRef = ref(null)
  const formSearchRef = ref(null)
  const router = useRouter()
  const { height: containerHeight } = useElementSize(containerRef)
  const { height: headerHeight } = useElementSize(headerRef)
  const commonStore = useCommonStore()
  const appealTableData = ref([])
  const streetList = ref([])
  const appealList = ref([])
  const appealsLabels = ref([])
  const activeAppealCategory = ref('')
  const formSearchData = reactive({
    keyword: '',
    streetId: '',
    appealLabelCode: '',
    appealSource: '',
    appealStatus: '',
    categoryChildCode: '',
    departmentId: '',
    updatedTime: '',
    submitTime: ''
  })
  const paginator = reactive({
    pageNum: 1,
    pages: 0,
    pageSize: 20,
    total: 0
  })

  const _getAppealTableData = async () => {
    loading.value = true
    const { data: resp } = await getAppeals({
      ...toRaw(formSearchData),
      ...toRaw(paginator)
    })
    loading.value = false
    if (resp.code === 0) {
      appealTableData.value = resp.data.list
      paginator.pageNum = resp.data.currentPage
      paginator.pages = resp.data.lastPage
      paginator.total = resp.data.total
      paginator.pagesSize = resp.data.perPage
    }
  }

  const fetchAppealsLabels = () => {
    loading.value = true
    getAppealsLabels()
      .then((res) => {
        loading.value = false
        if (res.data.code === 0) {
          appealsLabels.value = res.data.data
        } else {
          ElMessage.error({ message: res.data.msg })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getStreetList = () => {
    apis
      .getStreetList()
      .then((res) => {
        if (res.data.code === 0) {
          streetList.value = res.data.data
        }
      })
      .catch((err) => console.log(err))
  }

  const appealTypeList = () => {
    apis
      .getCategoryList()
      .then((res) => {
        if (res.data.code === 0) {
          appealList.value = convertCategoryList(res.data.data)
        }
      })
      .catch((err) => console.log(err))
  }

  const convertCategoryList = (data) => {
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

  onMounted(async () => {
    getStreetList()
    appealTypeList()
    fetchAppealsLabels()
    await _getAppealTableData()
  })

  const handleChange = (value) => {
    // 选择后默认为一级和二级的ID 改为仅需要二级ID
    formSearchData.categoryChildCode = value[1]
  }
  const handleAppealCategoryChange = (tabName) => {
    formSearchData.appealStatus = tabName
    _getAppealTableData()
  }
  const handleStreetChange = () => {}
  const handleReset = async () => {
    activeAppealCategory.value = ''
    formSearchData.keyword = ''
    formSearchData.appealLabelCode = ''
    formSearchData.appealStatus = ''
    formSearchData.categoryChildCode = ''
    formSearchData.departmentId = ''
    formSearchData.updatedTime = ''
    formSearchData.submitTime = ''
    formSearchData.streetId = ''
    formSearchData.appealSource = ''
    paginator.pageNum = 1
    paginator.pages = 0
    paginator.pageSize = 20
    paginator.total = 0
    await _getAppealTableData()
  }
  const handleSizeChange = async (currentSize) => {
    paginator.pageSize = currentSize
    await _getAppealTableData()
  }

  const handleCurrentChange = async (current) => {
    paginator.pageNum = current
    await _getAppealTableData()
  }
  const handleSearch = async () => {
    await _getAppealTableData()
  }
  const handleProxyCommit = () => {
    router.push({
      name: 'CreateProxyAppeal',
      query: {}
    })
  }
  const handleExport = () => {
    apis
      .exportAppealList({ ...formSearchData })
      .then((res) => {
        if (res.data.code === 0) {
          window.open(res.data.data.url)
        } else {
          ElMessage.error('导出失败')
        }
      })
      .catch((err) => console.log(err))
  }
  const handleGenerateReport = () => {}
  const handleShowAppealDetails = (row) => {
    router.push({
      name: 'AppealDetails',
      query: {
        sid: row.id
      }
    })
  }
  const handleDeleteAppeal = (row) => {
    ElMessageBox.confirm('确认要删除该条诉求吗?', '注意', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const { id } = toRaw(row)
      loading.value = true
      const resp = await removeAppeal(id)
      loading.value = false
      if (resp.data.code === 0) {
        ElMessage.success('诉求删除成功！')
        await _getAppealTableData()
      } else {
        ElMessage.error('诉求删除失败！' + resp.data.msg)
      }
    })
  }
</script>

<style lang="scss" scoped></style>

<style lang="scss">
  .my-el-form-item-flex {
    .el-date-editor {
      .el-input__wrapper {
        width: 100%;
      }
    }
  }
</style>
