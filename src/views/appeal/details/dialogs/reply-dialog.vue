<template>
  <div>
    <el-dialog
      v-model="$show"
      title="回复"
      width="30%">
      <template #default>
        <el-form
          :model="formData"
          label-position="left"
          label-width="80px">
          <el-form-item label="回复">
            <el-button
              type="primary"
              plain="">
              市信增办
            </el-button>
            <el-button type="primary">企业</el-button>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="radio">
              <el-radio label="1">推进中</el-radio>
              <el-radio label="2">办结</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              type="textarea"
              :rows="4">
            </el-input>
          </el-form-item>
          <el-form-item label="附件">
            <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              multiple
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :before-remove="beforeRemove"
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
  import { computed, reactive, toRefs, ref } from 'vue'
  import { ElMessageBox } from 'element-plus'
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['update:show', 'onReload'])
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

  const formData = reactive({})

  const radio = ref('1')

  const fileList = ref([
    {
      name: 'element-plus-logo.svg',
      url: 'https://element-plus.org/images/element-plus-logo.svg'
    },
    {
      name: 'element-plus-logo2.svg',
      url: 'https://element-plus.org/images/element-plus-logo.svg'
    }
  ])
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
    console.log('文件数量已达上限')
  }
  const handleSuccess = (response, file, files) => {
    console.log(response)
  }
  const submit = () => {
    emit('onReload')
    $show.value = false
  }
</script>

<style lang="scss" scoped></style>
