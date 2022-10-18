<!-- 诉求黑名单弹窗 -->
<template>
  <div class="black_dialog"></div>
  <el-dialog
    v-model="$show"
    width="720px"
    :align-center="true"
    @open="onOpen">
    <template #header>
      <h1>新增</h1>
    </template>

    <template #default>
      <el-form
        ref="formRef"
        :model="conditionForm">
        <el-row :gutter="18">
          <el-col :span="9">
            <el-form-item prop="keyword">
              <el-input
                v-model="conditionForm.keyword"
                class="search-input"
                placeholder="请输入单位名称搜索">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item>
              <el-button
                type="primary"
                plain
                @click="btnReset">
                重置
              </el-button>
              <el-button
                type="primary"
                :loading="queryLoading"
                @click="onQuery(formRef)">
                查询
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-table
        v-loading="loading"
        :data="blackCompanyList"
        height="200"
        :header-cell-style="{ background: '#EBEEF5' }"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection"> </el-table-column>
        <el-table-column
          prop="organizationName"
          label="企业名称"
          width="230">
        </el-table-column>
        <el-table-column
          prop="contact"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="organizationCode"
          label="账号"
          width="250">
        </el-table-column>
      </el-table>
    </template>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button
          type="primary"
          :loading="sureLoading"
          @click="onConfirm()">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, computed, toRefs, reactive } from 'vue'
  import { ElMessage } from 'element-plus'
  import * as apis from '@/apis/index'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })

  const { show } = toRefs(props)
  const emit = defineEmits(['update:show', 'onReload'])
  const $show = computed({
    get() {
      return show.value
    },
    set(val) {
      emit('update:show', val)
    }
  })

  // 确定按钮加载图标
  const sureLoading = ref(false)

  // 查询按钮加载图标
  const queryLoading = ref(false)

  // 表格加载图标
  const loading = ref(false)

  // 表单实例
  const formRef = ref(null)

  // 搜索条件
  const conditionForm = reactive({
    keyword: ''
  })

  // 接收传入的可选黑名单企业列表
  const blackCompanyList = ref([])

  // 当前已选择的企业
  const selectedList = ref([])

  const onOpen = () => {
    getGovernmentAppealList()
  }

  // 选择事件
  const handleSelectionChange = (rows) => {
    // console.log(rows)
    selectedList.value = rows
  }

  // 确定
  const onConfirm = () => {
    if (selectedList.value.length == 0) {
      ElMessage.warning('请至少选择一个企业')
    } else {
      sureLoading.value = true
      createGovernmentBlackList()
    }
  }

  // 获取可被添加进黑名单的企业列表
  const getGovernmentAppealList = () => {
    loading.value = true

    apis
      .getGovernmentAppealList({ ...conditionForm })
      .then((res) => {
        if (res.data.code === 0) {
          blackCompanyList.value = res.data.data
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        queryLoading.value = false
        loading.value = false
      })
  }
  // 将企业添加进诉求黑名单
  const createGovernmentBlackList = () => {
    const blackIds = selectedList.value
      .map((item) => {
        return item.id
      })
      .join(',')
    apis
      .createGovernmentBlackList({ blackIds })
      .then((res) => {
        if (res.data.code === 0) {
          ElMessage.success('新增成功')
          $show.value = false

          // 重新加载表格数据
          emit('onReload')
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        sureLoading.value = false
      })
  }

  // 重置
  const btnReset = () => {
    formRef.value.resetFields()
    onQuery()
  }

  // 查询
  const onQuery = () => {
    queryLoading.value = true
    getGovernmentAppealList()
  }

  // 取消
  const onCancel = () => {
    $show.value = false
  }

  // 表格滚动加载事件
  // const load = () => {
  //   getGovernmentAppealList()
  // }
</script>

<style scoped>
  /* 隐藏顶部复选框 */
  :deep(.el-table__header-wrapper .el-checkbox) {
    display: none;
  }
</style>
