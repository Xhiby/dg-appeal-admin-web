<template>
  <div
    v-loading="loading"
    class="page_main">
    <Breadcrumb
      class="tw-mb-[30px]"
      :list="[{ name: '诉求列表', path: '/appeal' }, { name: '领导详情' }]">
    </Breadcrumb>
    <div class="dga-details-container">
      <div class="tw-flex tw-items-start tw-justify-between tw-flex-col">
        <span class="tw-text-[18px] tw-text-[#303133] tw-font-medium tw-mb-[30px]">诉求进度</span>
        <el-steps
          :active="appealProcesses.length"
          finish-status="success"
          class="tw-min-w-[70vw]">
          <el-step
            v-for="(item, index) in appealProcesses"
            :key="index"
            :title="item.processLabel"
            :description="item.handleTime">
          </el-step>
        </el-steps>
        <div class="tw-flex tw-items-center tw-bg-[#fdf6ec] tw-w-full tw-h-65px tw-px-[18px] tw-py-[8px] tw-font-bold tw-mt-[30px]">
          <span class="tw-mr-[10px]">处理期限: </span><span class="tw-text-[#f56c6c] tw-text-[18px] tw-text-[18px]">2022-09-06</span>
          <span class="tw-ml-[20px]">剩余</span>
          <span class="tw-text-[#f56c6c] tw-text-[28px] tw-px-[5px]">3</span>
          <span>个工作日</span>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="tw-flex tw-justify-between">
        <div class="tw-flex tw-flex-col tw-min-w-[785px] tw-flex-[49%_0_1]">
          <div class="tw-flex tw-items-center tw-w-full tw-h-[45px] tw-bg-[#4584f8] tw-text-[#fff] tw-p-[15px]"> 诉求处理记录 </div>
          <div class="dga-handle-steps">
            <el-steps
              :active="appealRecords.length"
              direction="vertical"
              finish-status="finish"
              class="tw-w-full tw-py-[15px]">
              <el-step
                v-for="(item, index) in appealRecords"
                :key="index">
                <template #icon>
                  <div class="tw-w-[8px] tw-h-[8px] tw-bg-[#4584f8] tw-rounded-[50%]"></div>
                </template>
                <template #title>
                  <div class="tw-flex tw-items-center tw-justify-between tw-mb-[10px]">
                    <p class="tw-text-[16px] tw-font-bold tw-text-[#303133]">
                      <span>{{ item.departmentName }}</span> : <span class="tw-ml-[20px]">{{ item.handler }}</span> <span class="tw-ml-[40px]"> 电话:{{ item.handlerPhone }}</span>
                    </p>
                  </div>
                </template>
                <template #description>
                  <el-descriptions
                    :column="1"
                    size="small">
                    <el-descriptions-item
                      v-if="handleTypesComOptions[item.handleType]?.includes('recordLabel')"
                      label="操作:">
                      <span class="tw-text-[#E6A23C]">{{ item.recordLabel }}</span>
                    </el-descriptions-item>
                    <el-descriptions-item
                      v-if="handleTypesComOptions[item.handleType]?.includes('appealStatusString')"
                      label="状态:">
                      <span class="tw-text-[#606266]">{{ item.appealStatusString }}</span>
                    </el-descriptions-item>
                    <el-descriptions-item
                      v-if="handleTypesComOptions[item.handleType]?.includes('handleContent')"
                      label="内容:">
                      <span class="tw-text-[#606266]">
                        {{ item.appealStatusString }}
                      </span>
                    </el-descriptions-item>
                    <el-descriptions-item
                      v-if="handleTypesComOptions[item.handleType]?.includes('enclosure')"
                      label="附件:">
                      <span class="tw-text-[#606266]">
                        {{ item.appealStatusString }}
                      </span>
                    </el-descriptions-item>
                  </el-descriptions>
                </template>
              </el-step>
            </el-steps>
          </div>
        </div>
        <div class="tw-flex tw-flex-col tw-min-w-[785px] tw-flex-[49%_0_1]">
          <div class="tw-flex tw-items-center tw-w-full tw-h-[45px] tw-bg-[#4584f8] tw-text-[#fff] tw-p-[15px]"> 诉求信息 </div>
          <div class="tw-flex tw-flex-col">
            <el-descriptions
              border
              :column="2"
              size="large">
              <el-descriptions-item
                label="工单编号:"
                width="50px">
                {{ appealDetail.appealCode }}
              </el-descriptions-item>
              <el-descriptions-item
                label="处理状态:"
                width="50px">
                <span :style="`color:${appealStatus(appealDetail.appealStatus).color}`">{{ appealStatus(appealDetail.appealStatus).info }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="办理部门:">
                <span class="tw-text-[#606266]"> {{ appealDetail.handleDepartment }} </span>
              </el-descriptions-item>
              <el-descriptions-item label="街镇:">
                <span class="tw-text-[#606266]">{{ appealDetail.streetName }}</span>
              </el-descriptions-item>
              <el-descriptions-item
                label="诉求主题:"
                span="2">
                <span class="tw-text-[#606266]">{{ appealDetail.appealTheme }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="诉求分类:">
                <span class="tw-text-[#606266]">{{ appealDetail.appealCategoryName }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="诉求子类:">
                <span class="tw-text-[#606266]">{{ appealDetail.appealChildCategoryName }}</span>
              </el-descriptions-item>
              <el-descriptions-item
                label="诉求内容:"
                span="2">
                <span class="tw-text-[#606266]">{{ appealDetail.appealContent }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="申请来源:">
                <span class="tw-text-[#606266]">{{ appealDetail.appealSource }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="诉求标签:">
                <span class="tw-text-[#606266]">{{ appealDetail.appealLabelName }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="提交企业:">
                <span class="tw-text-[#606266]">{{ appealDetail.organizationName }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="企业类型:">
                <span class="tw-text-[#606266]">{{ appealDetail.organizationCategory }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="提交人:">
                <span class="tw-text-[#606266]">{{ appealDetail.submitter }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="联系电话:">
                <span class="tw-text-[#606266]">{{ appealDetail.phone }}</span>
              </el-descriptions-item>
            </el-descriptions>
            <div class="tw-flex tw-justify-between tw-items-center tw-w-[150px] tw-flex-nowrap">
              <el-button
                class="tw-mt-[15px]"
                type="primary"
                @click="showTaskDialog = true">
                接单
              </el-button>
              <el-button
                class="tw-mt-[15px]"
                type="primary"
                @click="showCityDialog = true">
                转回市信增办
              </el-button>
              <el-button
                class="tw-mt-[15px]"
                type="primary"
                @click="showStreetDialog = true">
                街道部门转办
              </el-button>
              <el-button
                class="tw-mt-[15px]"
                type="primary"
                @click="showReplyDialog = true">
                办理回复
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 确认接单dialog -->
    <accept-dialog
      v-model:show="showTaskDialog"
      @on-reload="back">
    </accept-dialog>
    <!-- 确认转回市倍增办 -->
    <city-back-dialog
      v-model:show="showCityDialog"
      @on-reload="back">
    </city-back-dialog>
    <!-- 街道转办 -->
    <street-dialog
      v-model:show="showStreetDialog"
      @on-reload="back">
    </street-dialog>
    <!-- 回复 -->
    <reply-dialog
      v-model:show="showReplyDialog"
      @on-reload="back">
    </reply-dialog>
  </div>
</template>

<script setup>
  import Breadcrumb from '@/components/breadcrumb/index.vue'
  import { useRoute } from 'vue-router'
  import { ref, onMounted, computed } from 'vue'
  import { getAppealDetail } from '@/apis/appeal-crud'
  import { ElMessage } from 'element-plus'
  import acceptDialog from './dialogs/accept-dialog.vue'
  import cityBackDialog from './dialogs/city-back-dialog.vue'
  import streetDialog from './dialogs/street-dialog.vue'
  import replyDialog from './dialogs/reply-dialog.vue'
  import { appealTag, handleTypesComOptions } from '@/config/global-var'

  const loading = ref(false)
  const showTaskDialog = ref(false)
  const showCityDialog = ref(false)
  const showStreetDialog = ref(false)
  const showReplyDialog = ref(false)

  const route = useRoute()
  // 诉求详情
  const appealDetail = ref({})
  // 	诉求处理进度
  const appealProcesses = ref([])
  // 	诉求处理意见
  const appealRecords = ref([])

  onMounted(() => {
    getDetail()
  })

  const getDetail = () => {
    getAppealDetail(route.query.sid)
      .then((res) => {
        if (res.data.code === 0) {
          const { appealDetailVo, appealHandleProcesses, appealHandleRecords } = res.data.data
          appealDetail.value = appealDetailVo
          appealProcesses.value = appealHandleProcesses
          appealRecords.value = appealHandleRecords
        } else {
          ElMessage.error(res.data.msg)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {})
  }

  const handleSplitTask = () => {
    showTaskDialog.value = false
  }
  const back = () => {
    console.log('准备路由返回')
  }

  const appealStatus = computed(() => {
    return (status) => {
      const result = appealTag.filter((item) => {
        return item.status === status
      })
      return result.length ? result[0] : { info: '' }
    }
  })
</script>

<style lang="scss" scoped></style>
<style lang="scss">
  .el-step__head.is-success {
    .el-step__line {
      background-color: var(--el-color-success);
    }
  }
</style>
