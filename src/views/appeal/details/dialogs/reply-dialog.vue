<template>
  <div>
    <el-dialog
      v-model="$show"
      title="回复"
      width="30%"
      @open="openDialog">
      <template #default>
        <el-form
          ref="formRef"
          :model="formData"
          label-position="left"
          label-width="80px">
          <el-form-item
            label="回复"
            prop="reply">
            <el-radio-group v-model="formData.applyObject">
              <el-radio label="1">企业</el-radio>
              <el-radio label="0">市信增办</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="状态"
            prop="status">
            <el-radio-group v-model="formData.handleStatus">
              <el-radio label="1">办结</el-radio>
              <el-radio label="0">推进中</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="内容"
            prop="text">
            <el-input
              v-model="formData.handleContent"
              type="textarea"
              :rows="4">
            </el-input>
          </el-form-item>
          <el-form-item
            label="附件"
            prop="fileList">
            <el-upload
              v-model:file-list="formData.mediaInfos"
              class="upload-demo"
              :action="`${fileUrl}/api/v1/common/files/uploads`"
              multiple
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :before-remove="beforeRemove"
              :on-error="handleError"
              :limit="3"
              :on-exceed="handleExceed">
              <el-button type="primary">添加相关附件</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$show = false">取消</el-button>
          <el-button
            type="primary"
            @click="submit">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { computed, reactive, toRefs, ref, toRaw } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  const fileUrl = import.meta.env.VITE_API_BASE_URL
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['update:show', 'confirm'])
  const { show } = toRefs(props)
  // 控制弹窗显示
  const $show = computed({
    get() {
      return show.value
    },
    set(val) {
      emit('update:show', val)
    }
  })

  const formData = reactive({
    applyObject: '1',
    handleStatus: '1',
    handleContent: '',
    mediaInfos: []
  })
  const formRef = ref(null)

  // const fileList = ref([])
  const beforeRemove = (uploadFile) => {
    return ElMessageBox.confirm(`是否要移除 ${uploadFile.name}文件 ?`).then(
      () => true,
      () => false
    )
  }
  const handleRemove = () => {
    console.log('文件移除时钩子')
  }
  const handleExceed = () => {
    ElMessage.error('文件上传数量已达上限')
  }
  const handleSuccess = (response) => {
    console.log(response)
  }
  const handleError = (err) => {
    console.log(err)
  }
  const openDialog = () => {
    formRef.value.resetFields()
  }
  const submit = () => {
    formRef.value.validate((valid) => {
      if (valid) {
        const appealPayload = toRaw(formData)
        emit('confirm', appealPayload)
      }
    })
    $show.value = false
  }
</script>

<style lang="scss" scoped></style>
