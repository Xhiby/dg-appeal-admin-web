<template>
  <el-dialog
    v-model="$show"
    class="my-el-dialog-header-span"
    width="650px"
    @open="onOpen"
    @close="onClose">
    <template #header>
      <h1>新增分类</h1>
    </template>
    <template #default>
      <el-form
        ref="formRef"
        class="tw-px-[10px]"
        size="large"
        :rules="rules"
        :model="formData"
        label-width="150px"
        label-position="left">
        <el-form-item
          prop="name"
          label="分类名称">
          <el-input
            v-model="formData.name"
            style="width: 100%"
            placeholder="请输入分类名称">
          </el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button
        size="large"
        @click="$show = false">
        取消
      </el-button>
      <el-button
        size="large"
        type="primary"
        :loading="btnLoading"
        @click="submitForm(formRef)">
        确认
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { reactive, ref, computed, toRefs } from 'vue'
  import { ElMessage } from 'element-plus'
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })
  const { show } = toRefs(props)
  const emit = defineEmits(['update:show'])
  const $show = computed({
    get() {
      return show.value
    },
    set(val) {
      emit('update:show', val)
    }
  })
  // 必填项
  const rules = reactive({
    name: [{ required: true, message: '请选择类型名称', trigger: 'blur' }]
  })
  // 按钮加载
  const btnLoading = ref(false)
  // 表单实例
  const formRef = ref(null)
  // 表单数据
  const formData = ref({
    id: 0,
    name: ''
  })
  const submitForm = (formRef) => {
    formRef.validate((valid) => {
      if (valid) {
        btnLoading.value = true
        setTimeout(() => {
          ElMessage.success('新增成功')
          btnLoading.value = false
          $show.value = false
        }, 2000)
      }
    })
  }
  // 打开dialog时回调函数
  const onOpen = () => {}

  // 关闭dialog时回调函数
  const onClose = () => {
    formRef.value.resetFields()
  }
</script>

<style lang="scss" scoped></style>
