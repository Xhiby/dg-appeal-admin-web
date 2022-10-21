<!-- 编辑需求弹框 -->
<template>
  <el-dialog
    v-model="showDialog"
    width="600px"
    :align-center="true"
    @close="onClose">
    <template #header>
      <h1>自办</h1>
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
          prop="replayDept"
          label="回复单位">
          <el-radio-group
            v-model="serviceForm.departmentType"
            class="ml-4"
            @change="handleDepartmentChange">
            <el-radio label="1"> 企业 </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          prop="relyType"
          label="状态">
          <el-radio-group
            v-model="serviceForm.relyType"
            class="ml-4"
            @change="handleDepartmentChange">
            <el-radio label="1"> 推进 </el-radio>
            <el-radio label="2"> 办结 </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          prop="handleContent"
          label="回复内容">
          <el-input
            v-model="serviceForm.handleContent"
            type="textarea"
            :rows="4"
            placeholder="请填写回复内容"
            :autosize="{ minRows: 4, maxRows: 6 }">
          </el-input>
        </el-form-item>
        <el-form-item
          prop="mediaInfos"
          label="相关附件">
          <el-upload
            v-model:file-list="serviceForm.mediaInfos"
            class="dg-appeal-uploader"
            :action="uploadUrl"
            multiple
            :limit="6"
            :before-upload="beforeImageUpload"
            :on-exceed="handleUploadExceed">
            <el-button type="primary">添加文件</el-button>
            <template #tip>
              <div class="el-upload__tip tw-text-[#F56C6C]"> 附件必须小于10MB. </div>
            </template>
          </el-upload>
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
  import { onMounted, reactive, ref, toRaw, watch } from 'vue'
  import { getAllDepartment } from '@/apis/appeal-crud'
  import { uploadUrl } from '@/apis/index.js'
  import { ElMessage } from 'element-plus'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })

  const serviceFormRef = ref(null)
  const showDialog = ref(props.show)
  const sureLoading = ref(false)
  const departmentsByStreet = ref([])
  const departmentsByCity = ref([])
  const serviceForm = reactive({
    departmentType: '1',
    relyType: '',
    handleContent: '',
    mediaInfos: []
  })
  const formRules = reactive({
    relyType: [{ required: true, message: '请选择状态', trigger: 'blur' }],
    handleContent: [{ required: true, message: '请输入回复内容', trigger: 'blur' }]
  })

  const emit = defineEmits(['confirm', 'close'])

  const fetchAllDepartmentByType = (departmentType) => {
    sureLoading.value = true
    getAllDepartment({ departmentType })
      .then((res) => {
        sureLoading.value = false
        if (res.data.code === 0) {
          if (departmentType === '0') {
            departmentsByStreet.value = res.data.data
          }
          if (departmentType === '1') {
            departmentsByCity.value = res.data.data
          }
        } else {
          ElMessage.error({ message: res.data.msg })
        }
      })
      .catch((err) => {
        sureLoading.value = false
        console.log(err)
      })
  }

  watch(props, () => {
    showDialog.value = props.show
  })

  onMounted(() => {
    fetchAllDepartmentByType(serviceForm.departmentType)
  })

  const handleDepartmentChange = (val) => {
    fetchAllDepartmentByType(val)
  }

  const beforeImageUpload = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 10) {
      ElMessage.error('图片大小不能超过10MB!')
      return false
    }
    return true
  }

  const handleUploadExceed = () => {
    ElMessage.warning(`上传文件总数不得超过6个!`)
  }

  const onConfirm = async () => {
    serviceFormRef.value.validate((valid) => {
      if (valid) {
        const appealPayload = toRaw(serviceForm)
        delete appealPayload.departmentType
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
