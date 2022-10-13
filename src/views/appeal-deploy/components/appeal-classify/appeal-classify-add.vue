<!-- 诉求配置新增弹窗 -->
<template>
  <div>
    <el-dialog
      :model-value="dialogInfo.show"
      title="新增分类"
      width="480px"
      :destroy-on-close="true"
      :before-close="onMainClose"
      @close="onClose">
      <el-form
        ref="ruleFormMain"
        :model="ruleFormMainType"
        :rules="rulesMainType"
        status-icon>
        <el-form-item
          label="分类名称"
          prop="typeName">
          <el-input
            v-model="ruleFormMainType.typeName"
            placeholder="请输入">
          </el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onMainCancel">取消</el-button>
          <el-button
            type="primary"
            @click="onMainConfirm(ruleFormMain)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="addChild"
      title="新增子类"
      width="480px"
      :destroy-on-close="true">
      <el-form
        ref="ruleFormChild"
        :model="ruleFormChildType"
        :rules="rulesChildType"
        size="default"
        label-width="106px"
        label-position="left"
        require-asterisk-position="right">
        <el-form-item
          label="诉求分类"
          prop="appealType">
          <el-select
            v-model="ruleFormChildType.appealType"
            placeholder="请选择"
            class="tw-w-full">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="子类名称"
          prop="appealSubType">
          <el-input
            v-model="ruleFormMainType.appealSubType"
            placeholder="请输入">
          </el-input>
        </el-form-item>

        <el-form-item
          label="评价时限"
          prop="evaluateTime">
          <el-input
            v-model="ruleFormMainType.evaluateTime"
            placeholder="请输入">
          </el-input>
        </el-form-item>

        <el-form-item
          label="诉求签收时限"
          prop="appealSignTime">
          <el-input
            v-model="ruleFormMainType.appealSignTime"
            placeholder="请输入">
          </el-input>
        </el-form-item>

        <el-form-item
          label="诉求处理时限"
          prop="appealHandleTime">
          <el-input
            v-model="ruleFormMainType.appealHandleTime"
            placeholder="请输入">
          </el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onChildCancel">取消</el-button>
          <el-button
            type="primary"
            @click="onChildConfirm(ruleFormChild)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { onMounted, reactive, ref } from 'vue'

  const props = defineProps({
    dialogInfo: {
      type: Object,
      default() {
        return {
          // 是否显示
          show: false
        }
      }
    }
  })

  const ruleFormMain = ref()

  const ruleFormChild = ref()

  const emit = defineEmits(['show'])

  let addChild = ref(false)

  let options = reactive([
    {
      label: '分类1',
      value: '分类1'
    },
    {
      label: '分类2',
      value: '分类2'
    },
    {
      label: '分类3',
      value: '分类3'
    }
  ])

  const ruleFormMainType = reactive({
    // 分类名称
    typeName: ''
  })

  const rulesMainType = reactive({
    typeName: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
  })

  const ruleFormChildType = reactive({
    // 诉求分类
    appealType: '',

    // 子类名称
    appealSubType: '',

    // 评价时限
    evaluateTime: '',

    // 签收时限
    appealSignTime: '',

    // 处理时限
    appealHandleTime: ''
  })

  const rulesChildType = reactive({
    appealType: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
    appealSubType: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
    evaluateTime: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
    appealSignTime: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
    appealHandleTime: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
  })

  // Main取消
  const onMainCancel = () => {
    onMainClose()
  }

  // Main确定
  const onMainConfirm = async () => {
    // 检查
    ruleFormMain.value.validate((valid) => {
      if (valid) {
        addChild.value = true
      } else {
        return false
      }
    })
  }

  // Main关闭的回调
  const onMainClose = () => {
    emit('show', false)
  }

  // Child取消
  const onChildCancel = () => {
    addChild.value = false
  }

  // Child确定
  const onChildConfirm = async () => {
    // 检查
    ruleFormChild.value.validate((valid) => {
      if (valid) {
        addChild.value = false
      } else {
        return false
      }
    })
  }

  onMounted(() => {})
</script>

<style lang="scss" scoped>
  :deep(.el-dialog) {
    .el-dialog__body {
      padding-bottom: 13px;
    }
  }
</style>
