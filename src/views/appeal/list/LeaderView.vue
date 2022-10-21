<template>
  <div
    ref="containerRef"
    class="tw-bg-white tw-overflow-x-hidden tw-overflow-y-auto tw-h-full tw-relative">
    <div ref="headerRef">
      <div class="tw-w-full tw-flex tw-justify-between tw-items-center">
        <page-title title="领导关注"></page-title>
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
      <div
        v-if="activeAppealCategory === ''"
        class="form-search tw-w-full tw-mt-[15px]">
        <el-form
          ref="formSearchRef"
          label-position="left"
          label-width="90px"
          class="my-el-form-item-flex tw-mb-[12px]"
          size="default"
          :inline="true"
          :model="formSearchData">
          <el-row :gutter="8">
            <el-col :span="8">
              <el-form-item
                label="评价搜索:"
                prop="keyword">
                <el-input
                  v-model="formSearchData.keyword"
                  class="tw-w-full"
                  placeholder="请输入诉求主题/企业名称/诉求编号">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="所属街镇:"
                prop="streetId">
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
              <el-form-item
                label="请求来源:"
                prop="appealSource">
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
              <el-form-item
                label="诉求分类:"
                prop="categoryChildCode">
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
              <el-form-item
                label="更新时间:"
                prop="updatedTime">
                <el-date-picker
                  v-model="formSearchData.updatedTime"
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
              <el-form-item
                label="提交时间:"
                prop="submitTime">
                <el-date-picker
                  v-model="formSearchData.submitTime"
                  type="daterange"
                  class="tw-w-full"
                  range-separator="至"
                  value-format="YYYY-MM-DD"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="请选择提交时间"
                  @change="onSubmitChange">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="8">
            <el-col :span="8">
              <el-form-item>
                <el-button
                  type="primary"
                  plain
                  @click="handleReset">
                  重置
                </el-button>
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
            <img
              v-if="scope.row.timeout === 1"
              src="../../../assets/images/appeal-list/icon_warn@2x.png"
              class="tw-w-[14px] tw-h-[14px] tw-inline-block"
              alt="" />
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
              v-if="scope.row.appealStatus === 3"
              class="tw-text-[14px] tw-text-[#57D3A2]">
              待评价
            </div>
            <div
              v-if="scope.row.appealStatus === 4"
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
              class="tw-text-[14px] tw-text-[#F56C6C]"
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
  import { onMounted, reactive, ref, toRaw, watch } from 'vue'
  import { getAppeals } from '@/apis/appeal-crud'
  import { useCommonStore } from '@/stores/common'
  import * as apis from '@/apis/index'
  import { storeToRefs } from 'pinia'
  import { appealSourceList } from '@/config/global-var'

  const loading = ref(false)
  const containerRef = ref(null)
  const headerRef = ref(null)
  const formSearchRef = ref(null)
  const router = useRouter()
  const commonStore = useCommonStore()
  const { currentLeader } = storeToRefs(commonStore)
  const { height: containerHeight } = useElementSize(containerRef)
  const { height: headerHeight } = useElementSize(headerRef)
  const appealTableData = ref([])
  const activeAppealCategory = ref('')
  const formSearchData = reactive({
    // 评价搜索
    keyword: '',
    // 所属街镇
    streetId: '',
    // 请求来源
    appealSource: '',
    // 诉求分类
    categoryChildCode: '',
    //更新时间
    updatedTime: '',
    // 提交时间
    submitTime: '',
    updateStartTime: '',
    updateEndTime: '',
    submitStartTime: '',
    submitEndTime: '',
    appealStatus: ''
  })
  const paginator = reactive({
    pageNum: 1,
    pages: 0,
    pageSize: 10,
    total: 0
  })
  // 街道列表
  const streetList = ref([])
  //
  const appealList = ref([])
  //请求列表数据
  const _getAppealTableData = async () => {
    loading.value = true
    const { data: resp } = await getAppeals({
      appealLabelCode: currentLeader.value,
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

  onMounted(async () => {
    getStreetList()
    appealTypeList()
    await _getAppealTableData()
  })

  const handleAppealCategoryChange = (e) => {
    for (const i in formSearchData) {
      formSearchData[i] = ''
    }
    formSearchData.appealStatus = e
    _getAppealTableData()
  }
  const handleStreetChange = () => {}
  const handleReset = async () => {
    paginator.pageNum = 1
    paginator.pages = 0
    paginator.pageSize = 10
    paginator.total = 0
    formSearchRef.value.resetFields()
    _getAppealTableData()
  }
  const handleSizeChange = async (currentSize) => {
    paginator.pageSize = currentSize
    await _getAppealTableData()
  }

  const handleCurrentChange = async (current) => {
    paginator.pageNum = current
    await _getAppealTableData()
  }
  const handleSearch = () => {
    paginator.pageNum = 1
    paginator.pageSize = 10
    _getAppealTableData()
  }
  const handleShowAppealDetails = (row) => {
    router.push({
      name: 'AppealDetails',
      query: {
        sid: row.id
      }
    })
  }
  const handleDeleteAppeal = (row) => {
    console.log(row)
  }

  //获取街道列表
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
  //获取诉求分类列表
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
  // 转换诉求分类列表
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
  const handleChange = (value) => {
    // 选择后默认为一级和二级的ID 改为仅需要二级ID
    formSearchData.categoryChildCode = value[1]
  }
  const onUpdateChange = (arr) => {
    formSearchData.updateStartTime = arr[0]
    formSearchData.updateEndTime = arr[1]
  }
  const onSubmitChange = (arr) => {
    formSearchData.submitStartTime = arr[0]
    formSearchData.submitEndTime = arr[1]
  }
  //诉求标签编号
  watch(currentLeader, () => {
    paginator.pageNum = 1
    paginator.pages = 0
    paginator.pageSize = 10
    paginator.total = 0
    activeAppealCategory.value = ''
    for (const i in formSearchData) {
      formSearchData[i] = ''
    }
    // 重置form信息 调用接口获取数据
    _getAppealTableData()
  })
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
