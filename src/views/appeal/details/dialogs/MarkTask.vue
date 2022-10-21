<!-- 编辑需求弹框 -->
<template>
  <el-dialog
    v-model="showDialog"
    width="600px"
    :align-center="true"
    @close="onClose">
    <template #header>
      <h1>标记</h1>
    </template>
    <template #default>
      <el-form
        ref="serviceFormRef"
        class="tw-px-[10px]"
        size="large"
        label-position="left"
        label-width="100px"
        :model="serviceForm"
        :rules="formRules">
        <el-form-item
          prop="appealSign"
          label="处理情况">
          <el-radio-group
            v-model="serviceForm.appealSign"
            class="tw-ml-4">
            <el-radio label="有效，但短期无法解决"> 有效，但短期无法解决 </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          prop="isTop"
          label="是否置顶">
          <el-switch v-model="serviceForm.isTop"></el-switch>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
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
  import { reactive, ref, toRaw, watch } from 'vue'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })

  const serviceFormRef = ref(null)
  const showDialog = ref(props.show)
  const sureLoading = ref(false)
  const serviceForm = reactive({
    appealSign: '有效，但短期无法解决',
    isTop: 0
  })
  const formRules = reactive({
    appealSign: [{ required: true, message: '请确认处理情况', trigger: 'blur' }],
    isTop: [{ required: true, message: '请确认是否置顶', trigger: 'blur' }]
  })

  const emit = defineEmits(['confirm', 'close'])

  watch(props, () => {
    showDialog.value = props.show
  })

  const onConfirm = async () => {
    serviceFormRef.value.validate((valid) => {
      if (valid) {
        const appealPayload = toRaw(serviceForm)
        appealPayload.isTop = appealPayload.isTop ? 1 : 0
        emit('confirm', appealPayload)
      }
    })
  }

  const onClose = () => {
    emit('close', [])
  }

  const onCancel = () => {
    emit('close', [])
  }
</script>

<style lang="scss">
  .dg-split-task-tab {
    .el-tabs__header {
      .el-tabs__nav-wrap {
        &::after {
          display: none;
        }
      }
      .el-tabs__item {
        padding: 0 10px;
      }
      .el-tabs__item .is-icon-close {
        position: relative;
        top: 2px;
        width: 0;
        height: 1em;
      }
      .el-tabs__item.is-active .is-icon-close {
        width: 14px;
      }
    }
  }
</style>
