<!-- 诉求标签弹窗 -->
<template>
  <el-dialog
    v-model="$show"
    width="480px"
    :align-center="true"
    @open="onOpen"
    @close="onClose">
    <template #header>
      <h1>{{ $isEdit ? '编辑' : '新增' }}</h1>
    </template>

    <template #default>
      <el-form
        ref="formRef"
        :rules="rules"
        :model="formData"
        label-position="left"
        require-asterisk-position="right">
        <el-form-item
          prop="labelName"
          label="标签">
          <el-input
            v-model="formData.labelName"
            placeholder="请输入">
          </el-input>
        </el-form-item>
      </el-form>
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
  import * as apis from '@/apis/index'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    dialogData: {
      type: Object,
      default: () => ({})
    }
  })

  const { show, dialogData } = toRefs(props)

  const emit = defineEmits(['update:show', 'onReload'])

  // 控制弹窗显示
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

  // 是否为编辑模式
  const $isEdit = computed(() => {
    return dialogData.value ? true : false
  })

  // 表单相关
  const formRef = ref(null)
  const formData = ref({
    labelName: ''
  })
  const rules = reactive({
    labelName: [{ required: true, message: '请选择标签', trigger: 'blur' }]
  })

  // 打开的回调
  const onOpen = () => {
    if ($isEdit.value) {
      formData.value = { ...dialogData.value }
    }
  }

  // 确定
  const onConfirm = (formRef) => {
    formRef.validate((valid) => {
      if (valid) {
        if ($isEdit.value) {
          // 编辑
          updateGovernmentLabel()
        } else {
          // 新增
          createGovernmentLabel()
        }
      }
    })
  }

  // 新增诉求标签
  const createGovernmentLabel = () => {
    sureLoading.value = true

    apis
      .createGovernmentLabel({
        labelName: formData.value.labelName
      })
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

  // 修改诉求标签
  const updateGovernmentLabel = () => {
    sureLoading.value = true
    apis
      // 此处labelId为标签的Id
      .updateGovernmentLabel({ ...formData.value, labelId: formData.value.id })
      .then((res) => {
        if (res.data.code === 0) {
          ElMessage.success('修改成功')
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

  // 关闭的回调
  const onClose = () => {
    // 重置表单
    formRef.value.resetFields()
  }

  // 取消
  const onCancel = () => {
    $show.value = false
  }
</script>

<style scoped></style>
