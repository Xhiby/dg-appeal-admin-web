<!-- 诉求标签弹窗 -->
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
      <!-- 点新增显示的表单 -->
      <el-form
        v-if="!$isEdit"
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

      <!-- 点编辑显示的表单 -->
      <el-form
        v-else
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
          @click="onConfirm(formRefEdit, formRefAdd)">
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

  // 是否为编辑模式
  const $isEdit = computed(() => {
    return dialogTag.value
  })

  // 新增表单相关
  const formRefAdd = ref(null)
  const formDataAdd = ref({
    dialogTag: ''
  })
  const rulesAdd = reactive({
    dialogTag: [{ required: true, message: '请输入标签', trigger: 'blur' }]
  })

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
    if ($isEdit.value) {
      formDataEdit.value.dialogTag = JSON.parse(JSON.stringify(dialogTag.value))
      getGovernmentLabelList()
    }
  }

  // 关闭的回调
  const onClose = () => {
    // 重置表单
    if ($isEdit.value) {
      formRefEdit.value.resetFields()
    } else {
      formRefAdd.value.resetFields()
    }
  }

  // 取消
  const onCancel = () => {
    $show.value = false
  }

  // 确定
  const onConfirm = (formRefEdit, formRefAdd) => {
    if ($isEdit.value) {
      // 编辑表单点确定
      formRefEdit.validate((valid) => {
        if (valid) {
          sureLoading.value = true

          // 编辑事件

          setTimeout(() => {
            $isEdit.value ? ElMessage.success('修改成功') : ElMessage.success('新增成功')
            sureLoading.value = false
            onCancel()
          }, 500)
        }
      })
    } else {
      formRefAdd.validate((valid) => {
        if (valid) {
          // 新增表单点确定
          sureLoading.value = true
          createGovernmentLabel()
        }
      })
    }
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

  // 编辑诉求标签

  // 删除诉求标签
</script>

<style scoped></style>
