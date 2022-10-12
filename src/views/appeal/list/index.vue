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
          name="1">
        </el-tab-pane>
        <el-tab-pane
          label="待处理"
          name="2">
        </el-tab-pane>
        <el-tab-pane
          label="推进中"
          name="3">
        </el-tab-pane>
        <el-tab-pane
          label="待评价"
          name="4">
        </el-tab-pane>
        <el-tab-pane
          label="已完结"
          name="5">
        </el-tab-pane>
        <el-tab-pane
          label="失效"
          name="6">
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
                  v-model="formSearchData.street"
                  class="tw-w-full"
                  placeholder="请选择所属街镇"
                  @change="handleStreetChange">
                  <el-option
                    label="近7天"
                    value="1">
                  </el-option>
                  <el-option
                    label="1个月"
                    value="2">
                  </el-option>
                  <el-option
                    label="3个月"
                    value="3">
                  </el-option>
                  <el-option
                    label="1年"
                    value="4">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="请求来源:">
                <el-select
                  v-model="formSearchData.street"
                  class="tw-w-full"
                  placeholder="请选择请求来源"
                  @change="handleStreetChange">
                  <el-option
                    label="近7天"
                    value="1">
                  </el-option>
                  <el-option
                    label="1个月"
                    value="2">
                  </el-option>
                  <el-option
                    label="3个月"
                    value="3">
                  </el-option>
                  <el-option
                    label="1年"
                    value="4">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="8">
            <el-col :span="8">
              <el-form-item label="需求分类:">
                <el-select
                  v-model="formSearchData.street"
                  class="tw-w-full"
                  placeholder="请选择所属街镇"
                  @change="handleStreetChange">
                  <el-option
                    label="近7天"
                    value="1">
                  </el-option>
                  <el-option
                    label="1个月"
                    value="2">
                  </el-option>
                  <el-option
                    label="3个月"
                    value="3">
                  </el-option>
                  <el-option
                    label="1年"
                    value="4">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="市领导关注:">
                <el-select
                  v-model="formSearchData.street"
                  class="tw-w-full"
                  placeholder="请选择请求来源"
                  @change="handleStreetChange">
                  <el-option
                    label="近7天"
                    value="1">
                  </el-option>
                  <el-option
                    label="1个月"
                    value="2">
                  </el-option>
                  <el-option
                    label="3个月"
                    value="3">
                  </el-option>
                  <el-option
                    label="1年"
                    value="4">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="更新时间:">
                <el-date-picker
                  v-model="formSearchData.updateDate"
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
                  v-model="formSearchData.updateDate"
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
      <div class="tw-w-[200px] tw-flex tw-items-center tw-justify-between">
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
          type="primary"
          @click="handleGenerateReport">
          生成简报
        </el-button>
      </div>
    </div>
    <div class="tw-mt-[20px]"></div>
  </div>
</template>

<script setup>
  import PageTitle from '@/components/page-title.vue'
  import { reactive, ref } from 'vue'

  const activeAppealCategory = ref('1')
  const formSearchData = reactive({
    keyword: '',
    street: '',
    updateDate: ''
  })

  const handleAppealCategoryChange = () => {}
  const handleStreetChange = () => {}
  const handleReset = () => {}
  const handleSearch = () => {}
  const handleProxyCommit = () => {}
  const handleExport = () => {}
  const handleGenerateReport = () => {}
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
