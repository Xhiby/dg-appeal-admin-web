<!-- 诉求标签页弹窗 -->
<template>
  <div>
    <el-dialog
      v-model="$show"
      title="编辑"
      width="480px"
      :align-center="true">
      <el-form
        ref="ruleFormRef"
        :model="ruleFormTag"
        :rules="rulesTag"
        status-icon>
        <el-form-item
          label="标签"
          prop="tag">
          <el-select
            v-model="ruleFormTag.tag"
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
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel">取消</el-button>
          <el-button
            type="primary"
            @click="onConfirm(ruleFormRef)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { onMounted, reactive, ref, watch } from 'vue'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    dialogForm: {
      type: Object,
      default: null
    }
  })

  const {show,dialogForm} = toRefs(props)
  



  const ruleFormRef = ref()

  const emit = defineEmits(['show'])

  const ruleFormTag = reactive({
    tag: ''
  })

  const rulesTag = reactive({
    tag: [{ required: true, message: '请输入标签', trigger: 'blur' }]
  })

  let options = reactive([])

  // 取消
  const onCancel = () => {
    onClose()
  }

  // 确定
  const onConfirm = () => {
    // 检查
    ruleFormRef.value.validate((valid) => {
      if (valid) {
        // 选择的结果
        console.log(ruleFormTag.tag)

        onClose()
      } else {
        return false
      }
    })
  }

  // 关闭的回调
  const onClose = () => {
    emit('show', false)

    changeServiceList()
  }

  // 初始化或者改变可被分配的服务专员列表
  const changeServiceList = () => {
    options = []
  }

  watch(props.dialogInfo, () => {
    options.push(...JSON.parse(JSON.stringify(props.dialogInfo.tag)))
    ruleFormTag.tag = options[0]

    // console.log(ruleFormTag.tag)
  })

  onMounted(() => {})
</script>

<style lang="scss" scoped>
  :deep(.el-dialog) {
    .el-dialog__body {
      padding-bottom: 13px;
    }
  }
</style>
