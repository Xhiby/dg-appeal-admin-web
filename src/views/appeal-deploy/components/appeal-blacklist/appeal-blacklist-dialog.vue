<!-- 诉求黑名单弹窗 -->
<template>
  <el-dialog
    v-model="$show"
    width="720px"
    :align-center="true"
    @open="onOpen"
    @close="onClose">
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
                @click="onSearch(formRef)">
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
        header-cell-class-name="my-el-table-header-gray-cell-name"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection"> </el-table-column>
        <el-table-column
          prop="name"
          label="企业名称"
          width="250">
        </el-table-column>
        <el-table-column
          prop="deputyPerson"
          label="姓名">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="uniqueIdentifier"
          label="账号"
          width="250">
        </el-table-column>
      </el-table>

      <div class="tab_pane_footer">
        <el-pagination
          v-model:currentPage="pagination.pageNum"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 40, 60]"
          small
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="onSearch"
          @current-change="getGovernmentAppealList">
        </el-pagination>
      </div>
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
  import { usePagination } from '@/utils/hooks'
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

  // 分页对象
  const { pagination } = usePagination()

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

  // 获取可被添加进黑名单的企业列表
  const getGovernmentAppealList = () => {
    loading.value = true

    apis
      .getGovernmentAppealList({ ...conditionForm, ...pagination })
      .then((res) => {
        if (res.data.code === 0) {
          const { list, total, currentPage } = res.data.data

          pagination.pageNum = currentPage
          pagination.total = total
          blackCompanyList.value = list
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        queryLoading.value = false
        loading.value = false
      })
  }

  // 选择事件
  const handleSelectionChange = (rows) => {
    selectedList.value = rows
  }

  // 确定
  const onConfirm = () => {
    if (selectedList.value.length == 0) {
      ElMessage.warning('请至少选择一个企业')
    } else {
      createGovernmentBlackList()
    }
  }

  // 将企业添加进诉求黑名单
  const createGovernmentBlackList = () => {
    sureLoading.value = true

    const blackIds = selectedList.value
      .map((item) => {
        return item.id
      })
      .join(',')

    console.log(blackIds)

    apis
      .createGovernmentBlackList({ blackIds })
      .then((res) => {
        if (res.data.code === 0) {
          ElMessage.success('新增成功')

          onCancel()

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
    onSearch()
  }

  // 查询
  const onSearch = () => {
    pagination.pageNum = 1
    queryLoading.value = true
    getGovernmentAppealList()
  }

  // 取消
  const onCancel = () => {
    $show.value = false
  }

  // 关闭
  const onClose = () => {
    formRef.value.resetFields()
  }
</script>

<style scoped>
  /* 隐藏表头复选框 */
  :deep(.el-table__header-wrapper .el-checkbox) {
    display: none;
  }

  .tab_pane_footer {
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;
  }
</style>
