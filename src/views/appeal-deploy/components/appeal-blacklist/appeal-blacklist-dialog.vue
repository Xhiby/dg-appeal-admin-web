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
        :model="formData"
        :rules="rules">
        <el-row :gutter="18">
          <el-col :span="9">
            <el-form-item prop="companyName">
              <el-input
                v-model="formData.companyName"
                class="search-input"
                placeholder="请输入单位名称搜索">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item>
              <el-button @click="btnReset">重置</el-button>
              <el-button
                type="primary"
                @click="onQuery()">
                查询
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-table
        :data="blackCompanyList"
        @selection-change="handleSelectionChange">
        <!-- 复选框和企业名称在同一列 -->
        <!-- <el-table-column label="企业名称">
          <template #default="scope">
            <el-row
              :gutter="10"
              class="checkbox_column"
              style="">
              <el-col :span="3">
                <el-checkbox v-model="scope.row.checked"> </el-checkbox>
              </el-col>
              <el-col :span="20">
                <span>{{ scope.row.companyName }}</span>
              </el-col>
            </el-row>
          </template>
        </el-table-column> -->

        <el-table-column type="selection"> </el-table-column>
        <el-table-column
          prop="companyName"
          label="企业名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="账号">
        </el-table-column>
      </el-table>
    </template>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button
          type="primary"
          :loading="sureLoading"
          @click="onConfirm(formRef)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, computed, toRefs, reactive } from 'vue'
  import { ElMessage } from 'element-plus'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    companyList: {
      type: Array,
      default: null
    }
  })

  const { show, companyList } = toRefs(props)
  const emit = defineEmits(['update:show'])
  const $show = computed({
    get() {
      return show.value
    },
    set(val) {
      emit('update:show', val)
    }
  })

  // 按钮加载图标
  const sureLoading = ref(false)

  const formRef = ref(null)

  const formData = ref({
    companyName: ''
  })

  const rules = reactive({
    companyName: [{ require: false, message: '请先输入公司名称', trigger: 'blur' }]
  })

  // 接收传入的可选黑名单企业列表
  const blackCompanyList = ref([])

  // 当前已选择的企业
  const selectedList = ref([])

  const onOpen = () => {
    blackCompanyList.value = JSON.parse(JSON.stringify(companyList.value))
  }

  const handleSelectionChange = (rows) => {
    selectedList.value = rows
  }

  // 选择复选框事件
  // const onChange = (row) => {
  //   selectedList.value.push(JSON.parse(JSON.stringify(row)))
  //   console.log(selectedList)
  // }

  // 取消
  const onCancel = () => {
    $show.value = false
  }

  // 确定
  const onConfirm = (formRef) => {
    // console.log(JSON.parse(JSON.stringify(selectedList.value)))

    if (selectedList.value.length == 0) {
      ElMessage.warning('请至少选择一个企业')
    } else {
      formRef.validate((valid) => {
        if (valid) {
          sureLoading.value = true
          setTimeout(() => {
            ElMessage.success('新增成功')
            sureLoading.value = false
            onCancel()
          }, 500)
        }
      })
    }
  }

  // 重置
  const btnReset = () => {
    formRef.value.resetFields()
  }

  // 查询
  const onQuery = () => {
    $show.value = false
  }
</script>

<style scoped>
  /* 修改搜索框宽度 */
  .black_dialog >>> .search-input {
    width: 240px;
  }

  /* 隐藏顶部复选框 */
  ::v-deep .el-table__header-wrapper .el-checkbox {
    display: none;
  }

  .checkbox_column {
    display: flex;
    align-items: center;
  }
</style>
