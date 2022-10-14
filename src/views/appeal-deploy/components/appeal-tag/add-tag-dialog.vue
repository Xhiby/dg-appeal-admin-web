<!-- 新增诉求标签弹窗 -->
<template>
  <el-dialog
    v-model="$show"
    width="480px"
    :align-center="true"
    @close="onClose">
    <template #header>
      <h1>新增</h1>
    </template>

    <template #default>
      <el-form
        ref="formRefAdd"
        :rules="rulesAdd"
        :model="formDataAdd"
        label-position="left"
        require-asterisk-position="right">
        <el-form-item
          prop="dialogTag"
          label="标签">
          <el-input
            v-model="formDataAdd.dialogTag"
            placeholder="请输入">
          </el-input>
        </el-form-item>
      </el-form>
    </template>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button
          type="primary"
          :loading="sureLoading"
          @click="onConfirm(formRefAdd)">
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
    }
  })

  const { show } = toRefs(props)

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

  // 新增表单相关
  const formRefAdd = ref(null)
  const formDataAdd = ref({
    dialogTag: ''
  })
  const rulesAdd = reactive({
    dialogTag: [{ required: true, message: '请输入标签', trigger: 'blur' }]
  })

  // 关闭的回调
  const onClose = () => {
    formRefAdd.value.resetFields()
  }

  // 取消
  const onCancel = () => {
    $show.value = false
  }

  // 确定
  const onConfirm = (formRefAdd) => {
    formRefAdd.validate((valid) => {
      if (valid) {
        // 新增表单点确定
        sureLoading.value = true
        createGovernmentLabel()
      }
    })
  }

  // 新增诉求标签
  const createGovernmentLabel = () => {
    // 要发送的数据
    const temp = {
      labelName: formDataAdd.value.dialogTag
    }

    apis
      .createGovernmentLabel(temp)
      .then((res) => {
        console.log(res.data)
        if (res.data.code === 0) {
          ElMessage.success('新增成功')
          $show.value = false
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        sureLoading.value = false
      })
  }
</script>

<style scoped></style>
