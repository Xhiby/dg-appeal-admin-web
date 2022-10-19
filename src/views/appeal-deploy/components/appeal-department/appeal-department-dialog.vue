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
          prop="street"
          label="街镇部门">
          <el-input
            v-model="formData.street"
            :disabled="$isEdit"
            placeholder="请输入">
          </el-input>
        </el-form-item>

        <el-form-item
          prop="principal"
          label="服务专员">
          <el-select
            v-model="formData.principal"
            placeholder="请选择"
            class="tw-w-full"
            @change="onChange">
            <el-option
              v-for="item in serviceList"
              :key="item.principalId"
              :label="item.principal"
              :value="item.principal">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </template>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button
          type="primary"
          :loading="sureLoading"
          @click="onConfirm">
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
    // 当前需要编辑的
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

  const formRef = ref(null)

  const formData = ref({
    street: '',
    principal: '',
    principalId: ''
  })

  const rules = reactive({
    street: [{ required: true, message: '请输入街镇部门', trigger: 'blur' }],
    principal: [{ required: true, message: '请选择服务专员', trigger: 'blur' }]
  })

  // 可被选择的服务专员列表
  const serviceList = ref([
    { principal: '专员1', principalId: '101' },
    { principal: '专员2', principalId: '102' },
    { principal: '专员3', principalId: '103' }
  ])

  // 是否为编辑模式
  const $isEdit = computed(() => {
    return dialogData.value ? true : false
  })

  // 打开的回调
  const onOpen = () => {
    if ($isEdit.value) {
      formData.value = JSON.parse(JSON.stringify(dialogData.value))
    }

    console.log(formData.value)
    // 调用接口获取 serviceList
  }

  // 确定
  const onConfirm = () => {
    formRef.value.validate((valid) => {
      if (valid) {
        if ($isEdit.value) {
          updateGovernmentDep()
        } else {
          createGovernmentDep()
        }
      }
    })
  }

  // 创建诉求部门
  const createGovernmentDep = () => {
    sureLoading.value = true

    apis
      .createGovernmentDep({ ...formData.value })
      .then((res) => {
        if (res.data.code === 0) {
          ElMessage.success('新增成功')
          closeDialog()
          // 重新加载表格数据
          emit('onReload')
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        sureLoading.value = false
      })
  }

  // 修改诉求部门
  const updateGovernmentDep = () => {
    sureLoading.value = true
    apis
      .updateGovernmentDep({ ...formData.value })
      .then((res) => {
        if (res.data.code === 0) {
          ElMessage.success('修改成功')
          closeDialog()
          // 重新加载表格数据
          emit('onReload')
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        sureLoading.value = false
      })
  }

  // 选择服务专员事件
  const onChange = () => {
    // 遍历全部服务专员列表，找到和当前选择服务专员一致的Id
    formData.value.principalId = serviceList.value.find((item) => {
      return item.principal == formData.value.principal
    }).principalId
  }

  // 关闭dialog回调
  const onClose = () => {
    formRef.value.resetFields()
  }
  const closeDialog = () => {
    $show.value = false
  }
</script>

<style scoped></style>
