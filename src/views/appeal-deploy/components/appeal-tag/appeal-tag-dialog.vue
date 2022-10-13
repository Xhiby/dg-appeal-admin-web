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
          prop="dialogTag"
          label="标签">
          <el-select
            v-model="formData.dialogTag"
            placeholder="请选择"
            class="tw-w-full">
            <el-option
              v-for="item in dialogTagList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    dialogTag: {
      type: String,
      default: null
    },
    dialogTagList: {
      type: Array,
      default: null
    }
  })

  const { show, dialogTag, dialogTagList } = toRefs(props)

  const emit = defineEmits(['update:show'])

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

  const formRef = ref(null)

  const formData = ref({
    dialogTag: ''
  })

  const rules = reactive({
    dialogTag: [{ required: true, message: '请选择标签', trigger: 'blur' }]
  })

  // 是否为编辑模式
  const $isEdit = computed(() => {
    return dialogTag.value
  })

  // 打开的回调
  const onOpen = () => {
    if ($isEdit.value) {
      formData.value.dialogTag = JSON.parse(JSON.stringify(dialogTag.value))
    }
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

  // 确定
  const onConfirm = (formRef) => {
    formRef.validate((valid) => {
      if (valid) {
        sureLoading.value = true
        setTimeout(() => {
          $isEdit.value ? ElMessage.success('修改成功') : ElMessage.success('新增成功')
          sureLoading.value = false
          onCancel()
        }, 500)
      }
    })
  }
</script>

<style scoped></style>
