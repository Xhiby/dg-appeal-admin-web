<!-- 诉求部门弹窗 -->
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
          prop="depName"
          label="街镇部门">
          <el-input
            v-model="formData.depName"
            placeholder="请输入">
          </el-input>
        </el-form-item>

        <el-form-item
          prop="service"
          label="服务专员">
          <el-select
            v-model="formData.service"
            placeholder="请选择"
            class="tw-w-full">
            <el-option
              v-for="item in serviceList"
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
    dialogDepName: {
      type: String,
      default: null
    },
    dialogService: {
      type: String,
      default: null
    },
    dialogServiceList: {
      type: Array,
      default: null
    }
  })

  const { show, dialogDepName, dialogService, dialogServiceList } = toRefs(props)

  const emit = defineEmits(['update:show'])

  // 接收传入的服务专员列表
  const serviceList = ref([])

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
    depName: '',
    service: ''
  })

  const rules = reactive({
    depName: [{ required: true, message: '请输入街镇部门', trigger: 'blur' }],
    service: [{ required: true, message: '请选择服务专员', trigger: 'blur' }]
  })

  // 是否为编辑模式
  const $isEdit = computed(() => {
    return dialogDepName.value
  })

  // 打开的回调
  const onOpen = () => {
    if ($isEdit.value) {
      formData.value.depName = JSON.parse(JSON.stringify(dialogDepName.value))
      formData.value.service = JSON.parse(JSON.stringify(dialogService.value))
    }
    serviceList.value = JSON.parse(JSON.stringify(dialogServiceList.value))
  }

  // 关闭dialog回调
  const onClose = () => {
    $show.value = false
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
