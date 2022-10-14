<!-- 编辑诉求标签弹窗 -->
<template>
  <el-dialog
    v-model="$show"
    width="480px"
    :align-center="true"
    @open="onOpen"
    @close="onClose">
    <template #header>
      <h1>编辑</h1>
    </template>

    <template #default>
      <el-form
        ref="formRefEdit"
        :rules="rules"
        :model="formDataEdit"
        label-position="left"
        require-asterisk-position="right">
        <el-form-item
          prop="dialogTag"
          label="标签">
          <el-select
            v-model="formDataEdit.dialogTag"
            placeholder="请选择"
            class="tw-w-full">
            <el-option
              v-for="item in dialogTagList"
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
          @click="onConfirm(formRefEdit)">
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
    dialogTag: {
      type: String,
      default: null
    }
  })

  const { show, dialogTag } = toRefs(props)

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

  // 编辑表单相关
  const formRefEdit = ref(null)
  const formDataEdit = ref({
    dialogTag: ''
  })
  const rules = reactive({
    dialogTag: [{ required: true, message: '请选择标签', trigger: 'blur' }]
  })

  // 诉求标签列表
  const dialogTagList = ref([])

  // 打开的回调
  const onOpen = () => {
    formDataEdit.value.dialogTag = JSON.parse(JSON.stringify(dialogTag.value))
    getGovernmentLabelList()
  }

  // 关闭的回调
  const onClose = () => {
    formRefEdit.value.resetFields()
  }

  // 取消
  const onCancel = () => {
    $show.value = false
  }

  // 确定
  const onConfirm = (formRefEdit) => {
    formRefEdit.validate((valid) => {
      if (valid) {
        sureLoading.value = true

        // 编辑事件

        setTimeout(() => {
          ElMessage.success('修改成功')
          sureLoading.value = false
          onCancel()
        }, 500)
      }
    })
  }

  // 获取诉求标签列表
  const getGovernmentLabelList = () => {
    apis
      .getGovernmentLabelList()
      .then((res) => {
        if (res.data.code === 0) {
          let temp = res.data.data

          for (let item of temp) {
            item.label = item.labelName
            item.value = item.labelCode
          }

          dialogTagList.value = temp
        }
      })
      .catch((err) => console.log(err))
  }

  // 编辑诉求标签
</script>

<style scoped></style>
