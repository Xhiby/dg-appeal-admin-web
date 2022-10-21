<template>
  <div
    v-loading="loading"
    class="page_main">
    <Breadcrumb
      class="tw-mb-[30px]"
      :list="[{ name: '诉求列表', path: '/appeal' }, { name: '诉求详情' }]">
    </Breadcrumb>
    <div class="dga-details-container">
      <div class="tw-flex tw-items-start tw-justify-between tw-flex-col">
        <div class="tw-w-full tw-flex tw-justify-between">
          <span class="tw-text-[18px] tw-text-[#303133] tw-font-medium tw-mb-[30px]">诉求进度</span>
          <el-button
            class="tw-mr-[50px]"
            @click="showFile">
            呈批表
          </el-button>
        </div>
        <el-steps
          :active="appealDetail.appealStatus"
          finish-status="success"
          process-status="process"
          class="tw-min-w-[70vw]">
          <el-step
            v-for="process in appealProcesses"
            :key="process.appealCode"
            :title="`${process.departmentName} ${process.processLabel}`"
            :description="process.createdAt">
          </el-step>
        </el-steps>
        <div class="tw-flex tw-items-center tw-bg-[#fdf6ec] tw-w-full tw-h-65px tw-px-[18px] tw-py-[8px] tw-font-bold tw-mt-[30px]">
          <span class="tw-mr-[10px]">处理期限: </span>
          <span class="tw-text-[#f56c6c] tw-text-[18px] tw-text-[18px]"> {{ limitedDate }} </span>
          <span class="tw-ml-[20px]">剩余</span>
          <span class="tw-text-[#f56c6c] tw-text-[28px] tw-px-[5px]">{{ limitedDays }}</span>
          <span>个工作日</span>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="tw-flex tw-justify-between">
        <div class="tw-flex tw-flex-col tw-min-w-[785px] tw-flex-[49%_0_1]">
          <div class="tw-flex tw-items-center tw-w-full tw-h-[45px] tw-bg-[#4584f8] tw-text-[#fff] tw-p-[15px]"> 诉求处理意见 </div>
          <div class="dga-handle-steps">
            <el-steps
              :active="appealDetail.appealStatus"
              direction="vertical"
              class="tw-w-full tw-py-[15px]">
              <el-step
                v-for="record in appealRecords"
                :key="record.id">
                <template #icon>
                  <div class="tw-w-[8px] tw-h-[8px] tw-bg-[#4584f8] tw-rounded-[50%]"></div>
                </template>
                <template #title>
                  <div class="tw-flex tw-items-center tw-justify-between tw-mb-[10px]">
                    <span class="tw-text-[16px] tw-font-bold tw-text-[#303133]"> {{ record.departmentName }} {{ record.handler }} {{ record.handlerPhone }} </span>
                    <span class="tw-text-[16px] tw-font-semibold tw-text-[#909399]">{{ record.handleTime }}</span>
                  </div>
                </template>
                <template #description>
                  <el-descriptions
                    :column="1"
                    size="small">
                    <el-descriptions-item label="操作:">
                      <span class="tw-text-[#E6A23C]">{{ handleTypesMapper[record.handleType] }}</span>
                    </el-descriptions-item>
                    <el-descriptions-item label="状态:">
                      <span class="tw-text-[#E6A23C]">{{ record.appealStatusString ? record.appealStatusString : '暂无数据' }}</span>
                    </el-descriptions-item>
                    <el-descriptions-item label="内容:">
                      <span class="tw-text-[#606266]">
                        {{ record.handleContent ? record.handleContent : '暂无数据' }}
                      </span>
                    </el-descriptions-item>
                    <el-descriptions-item
                      v-if="record.enclosure !== null && record.enclosure !== undefined"
                      label="相关附件:">
                      <el-link
                        v-for="attachment in record.enclosure"
                        :key="attachment.id"
                        type="primary"
                        :href="attachment.downloadUrl">
                        {{ attachment.originName }}
                      </el-link>
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
              :column="1"
              size="large">
              <el-descriptions-item
                label="工单编号:"
                width="40px">
                {{ appealDetail.id }}
              </el-descriptions-item>
              <el-descriptions-item
                label="处理状态:"
                width="50px">
                <span class="tw-text-[#F56C6C]">{{ handleTypes[appealDetail.appealStatus] }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="办理部门:">
                <span class="tw-text-[#606266]">{{ appealDetail.departmentName }}</span>
              </el-descriptions-item>
              <el-descriptions-item label="街镇:">
                <span class="tw-text-[#606266]">{{ appealDetail.street }}</span>
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
            <el-button
              v-if="appealDetail.appealStatus !== 3 && appealDetail.appealStatus !== -1"
              class="tw-w-[60px] tw-mt-[15px]"
              type="primary"
              @click="showEditDialog = true">
              编辑
            </el-button>
            <el-divider></el-divider>
            <div class="tw-flex tw-flex-col">
              <span class="tw-mb-[10px]">阶段性总结</span>
              <el-input
                v-model="textarea"
                :rows="4"
                type="textarea"
                placeholder="请输入阶段性总结">
              </el-input>
              <el-button
                class="tw-w-[60px] tw-mt-[15px]"
                type="primary">
                提交
              </el-button>
            </div>
            <el-divider></el-divider>
            <div
              v-if="appealDetail.appealStatus === 0"
              class="tw-flex tw-justify-between tw-items-center tw-w-[150px] tw-flex-nowrap">
              <el-button
                class="tw-w-[60px] tw-mt-[15px]"
                type="primary"
                @click="handleSignInOrNot(true)">
                签收
              </el-button>
              <el-button
                class="tw-w-[60px] tw-mt-[15px]"
                type="primary"
                @click="handleSignInOrNot(false)">
                退回
              </el-button>
              <el-button
                class="tw-w-[60px] tw-mt-[15px]"
                type="primary"
                @click="showTaskDialog = true">
                拆分
              </el-button>
            </div>
            <div
              v-if="appealDetail.appealStatus >= 1 && appealDetail.appealStatus !== 3 && appealDetail.appealStatus !== -1"
              class="tw-flex tw-justify-between tw-items-center tw-w-[150px] tw-flex-nowrap">
              <el-button
                class="tw-w-[60px] tw-mt-[15px]"
                type="primary"
                @click="showForwardDialog = true">
                转办
              </el-button>
              <el-button
                class="tw-w-[60px] tw-mt-[15px]"
                type="primary"
                @click="showTaskHandleByMyselfDialog = true">
                自办
              </el-button>
              <el-button
                class="tw-w-[60px] tw-mt-[15px]"
                type="primary"
                @click="handleCompleteAppeal">
                完结
              </el-button>
              <el-button
                class="tw-w-[60px] tw-mt-[15px]"
                type="primary"
                @click="showMarkTaskDialog = true">
                标记
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <split-task-dialog
      :show="showTaskDialog"
      @close="showTaskDialog = false"
      @confirm="handleSplitTask">
    </split-task-dialog>
    <edit-task
      :show="showEditDialog"
      @close="showEditDialog = false"
      @confirm="handleEditTask">
    </edit-task>
    <forward-task
      :show="showForwardDialog"
      @close="showForwardDialog = false"
      @confirm="handleForwardTask">
    </forward-task>
    <task-handle-by-myself
      :show="showTaskHandleByMyselfDialog"
      @close="showTaskHandleByMyselfDialog = false"
      @confirm="handleTaskHandleByMyself">
    </task-handle-by-myself>
    <mark-task
      :show="showMarkTaskDialog"
      @close="showMarkTaskDialog = false"
      @confirm="handleMarkTask">
    </mark-task>
  </div>
</template>

<script setup>
  import Breadcrumb from '@/components/breadcrumb/index.vue'
  import { useRoute, useRouter } from 'vue-router'
  import { ref, onMounted } from 'vue'
  import { getAppealDetail, splitAppeal, editAppeal, signAppeal, markAppeal } from '@/apis/appeal-crud'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { handleTypes } from '@/config/global-var'
  import SplitTaskDialog from './dialogs/SplitTask.vue'
  import EditTask from './dialogs/EditTask.vue'
  import ForwardTask from './dialogs/ForwardTask.vue'
  import TaskHandleByMyself from './dialogs/TaskHandleByMyself.vue'
  import MarkTask from './dialogs/MarkTask.vue'

  const textarea = ref('')
  const loading = ref(false)
  const showMarkTaskDialog = ref(false)
  const showTaskHandleByMyselfDialog = ref(false)
  const showTaskDialog = ref(false)
  const showEditDialog = ref(false)
  const showForwardDialog = ref(false)
  const route = useRoute()
  const router = useRouter()
  const appealDetail = ref({})
  const appealProcesses = ref([])
  const appealRecords = ref([])
  const limitedDays = ref('')
  const limitedDate = ref('')
  const handleTypesMapper = {
    0: '提交',
    1: '签收',
    2: '接单',
    3: '推进中',
    4: '待评价',
    5: '已完成',
    '-1': '已退回',
    '-2': '拆分作废'
  }

  onMounted(() => {
    getDetail()
  })

  const getDetail = () => {
    loading.value = true
    getAppealDetail(route.query.sid)
      .then((res) => {
        loading.value = false
        if (res.data.code === 0) {
          const { appealDetailVo, appealHandleProcesses, appealHandleRecords } = res.data.data
          appealDetail.value = appealDetailVo
          appealProcesses.value = appealHandleProcesses
          appealRecords.value = appealHandleRecords
          switch (appealDetailVo.appealStatus) {
            case handleTypes.submit:
              limitedDays.value = appealDetail.value.hasHandleDays ? appealDetail.value.hasHandleDays : '--'
              limitedDate.value = appealDetail.value.handleLimitTime ? appealDetail.value.handleLimitTime : '--'
              break
            case handleTypes.sign:
              limitedDays.value = appealDetail.value.hasOrderDays ? appealDetail.value.hasOrderDays : '--'
              limitedDate.value = appealDetail.value.orderLimitTime ? appealDetail.value.orderLimitTime : '--'
              break
            case handleTypes.complete:
              limitedDays.value = appealDetail.value.hasEvaluateDays ? appealDetail.value.hasEvaluateDays : '--'
              limitedDate.value = appealDetail.value.evaluateLimitTime ? appealDetail.value.evaluateLimitTime : '--'
              break
          }
        } else {
          ElMessage.error(res.data.msg)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {})
  }

  const handleMarkTask = async (taskPayload) => {
    loading.value = true
    const resp = await markAppeal({
      appealId: route.query.sid,
      ...taskPayload
    })
    loading.value = false
    if (resp.data.code === 0) {
      ElMessage.success('标记诉求成功！')
      showEditDialog.value = false
      await router.push({
        name: 'AppealManager',
        query: {}
      })
    } else {
      ElMessage.error('标记诉求失败！' + resp.data.msg)
    }
  }

  const handleSignInOrNot = (signFlag) => {
    if (signFlag) {
      ElMessageBox.confirm('签收诉求后，您需要在指定时限内处理完成！请确认您的操作', '签收诉求', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        loading.value = true
        const resp = await signAppeal({
          appealId: route.query.sid,
          isSign: signFlag ? 1 : -1
        })
        loading.value = false
        loading.value = false
        if (resp.data.code === 0) {
          ElMessage.success('诉求签收成功！')
          showEditDialog.value = false
          await router.push({
            name: 'AppealManager',
            query: {}
          })
        } else {
          ElMessage.error('诉求签收失败！' + resp.data.msg)
        }
      })
    } else {
      ElMessageBox.prompt('', '退回诉求', {
        inputType: 'textarea',
        inputPlaceholder: '请填写退回诉求的原因!',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async (value) => {
        loading.value = true
        const resp = await signAppeal({
          appealId: route.query.sid,
          handleContent: value,
          isSign: signFlag ? 1 : -1
        })
        loading.value = false
        loading.value = false
        if (resp.data.code === 0) {
          ElMessage.success('诉求退回成功！')
          showEditDialog.value = false
          await router.push({
            name: 'AppealManager',
            query: {}
          })
        } else {
          ElMessage.error('诉求退回失败！' + resp.data.msg)
        }
      })
    }
  }

  const handleCompleteAppeal = () => {
    ElMessageBox.confirm('完结诉求后，用户无法再提交信息，直接对诉求处理情况进行评价，非一星评价直接完结整个诉求。?', '完结诉求', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        loading.value = true
        const resp = await editAppeal({
          appealId: route.query.sid,
          handleType: 4
        })
        loading.value = false
        if (resp.data.code === 0) {
          ElMessage.success('诉求完结成功！')
          showEditDialog.value = false
          await router.push({
            name: 'AppealManager',
            query: {}
          })
        } else {
          ElMessage.error('诉求完结失败！' + resp.data.msg)
        }
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: ''
        })
      })
  }

  const handleTaskHandleByMyself = async (taskPayload) => {
    loading.value = true
    const resp = await editAppeal({
      appealId: route.query.sid,
      handleType: 3,
      ...taskPayload
    })
    loading.value = false
    if (resp.data.code === 0) {
      ElMessage.success('诉求自办成功！')
      showEditDialog.value = false
      await router.push({
        name: 'AppealManager',
        query: {}
      })
    } else {
      ElMessage.error('诉求自办失败！' + resp.data.msg)
    }
  }

  const handleForwardTask = async (forwardPayload) => {
    loading.value = true
    const resp = await editAppeal({
      appealId: route.query.sid,
      handleType: 2,
      ...forwardPayload
    })
    loading.value = false
    if (resp.data.code === 0) {
      ElMessage.success('诉求转发成功！')
      showEditDialog.value = false
      await router.push({
        name: 'AppealManager',
        query: {}
      })
    } else {
      ElMessage.error('诉求转发失败！' + resp.data.msg)
    }
  }

  const handleEditTask = async (appeal) => {
    loading.value = true
    const resp = await editAppeal({
      appealId: route.query.sid,
      handleType: 1,
      ...appeal
    })
    loading.value = false
    if (resp.data.code === 0) {
      ElMessage.success('诉求编辑成功！')
      showEditDialog.value = false
      getDetail()
    } else {
      ElMessage.error('诉求编辑失败！' + resp.data.msg)
    }
  }

  const handleSplitTask = async (appeals) => {
    const resp = await splitAppeal({
      appealDtoList: appeals,
      appealId: route.query.sid
    })
    if (resp.data.code === 0) {
      ElMessage.success('诉求拆分请求成功！')
      showTaskDialog.value = false
      await router.push({
        name: 'AppealManager',
        query: {}
      })
    } else {
      ElMessage.error('诉求拆分请求失败！' + resp.data.msg)
    }
  }

  const showFile = () => {
    router.push({
      name: 'print',
      query: {
        sid: route.query.sid
      }
    })
  }
</script>

<style lang="scss" scoped></style>
<style lang="scss">
  .el-step__head.is-success {
    .el-step__line {
      background-color: var(--el-color-success);
    }
  }
</style>
