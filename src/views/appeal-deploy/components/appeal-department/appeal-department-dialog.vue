<!-- 诉求部门编辑弹窗 -->
<template>
  <div class="tw-w-480">
    <el-dialog
      v-model="dialogInfo.show"
      title="编辑"
      width="480px"
      :align-center="true"
      :destroy-on-close="true"
      :before-close="onClose">
      <el-form
        :model="ruleFormDep"
        :rules="rulesDep"
        status-icon>
        <el-form-item
          label="街镇部门"
          prop="depName">
          <el-input
            v-model="ruleFormDep.depName"
            placeholder="请输入">
          </el-input>
        </el-form-item>
        <el-form-item
          label="服务专员"
          prop="service">
          <el-select
            v-model="ruleFormDep.service"
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
            @click="onConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { onMounted, reactive, ref, watch } from 'vue'

  const props = defineProps({
    dialogInfo: {
      type: Object,
      default() {
        return {
          // 是否显示
          show: false,

          // 选择编辑的街镇部门
          depName: '',

          // 可被分配的服务专员
          service: []
        }
      }
    }
  })

  const emit = defineEmits(['show'])

  const ruleFormDep = reactive({
    // 街镇部门
    depName: '',

    // 服务专员
    service: ''
  })

  const rulesDep = reactive({
    depName: [{ required: true, message: '', trigger: 'blur' }],
    service: [{ required: true, message: '', trigger: 'blur' }]
  })

  let options = reactive([])

  // 取消
  const onCancel = () => {
    onClose()
  }

  // 确定
  const onConfirm = () => {
    onClose()
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

  // onMounted里读不到props 所以放这
  watch(props.dialogInfo, () => {
    ruleFormDep.depName = props.dialogInfo.depName
    options.push(...JSON.parse(JSON.stringify(props.dialogInfo.service)))
    ruleFormDep.service = options[0]

    // console.log(options)
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
