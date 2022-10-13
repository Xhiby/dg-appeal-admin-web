<!-- 诉求黑名单弹窗 -->
<template>
  <el-dialog
    v-model="$show"
    width="720px"
    :align-center="true">
    <template #header>
      <h1>新增</h1>
    </template>

    <template #default>
      <el-form
        ref="formRef"
        :model="formData">
        <el-row :gutter="12">
          <el-col :span="10">
            <el-form-item prop="companyName">
              <el-input
                v-model="formData.companyName"
                placeholder="请输入单位名称搜索">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item>
              <el-button @click="btnReset()">重置</el-button>
              <el-button
                type="primary"
                @click="onQuery()">
                查询
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-table :data="tableData">
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
  import { reactive, ref, computed, toRefs } from 'vue'
  import { ElMessage } from 'element-plus'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })

  const { show } = toRefs(props)
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

  const tableData = [
    {
      companyName: '东莞市银河光电有限公司',
      name: '张三',
      phone: '18200000001'
    },
    {
      companyName: '东莞市银河光电有限公司',
      name: '李四',
      phone: '18200000001'
    },
    {
      companyName: '东莞市银河光电有限公司',
      name: '王五',
      phone: '18200000001'
    }
  ]

  // 取消
  const onCancel = () => {
    $show.value = false
  }

  // 确定
  const onConfirm = (formRef) => {
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

  // 重置
  const btnReset = () => {
    $show.value = false
  }

  // 查询
  const onQuery = () => {
    $show.value = false
  }
</script>

<style scoped></style>
