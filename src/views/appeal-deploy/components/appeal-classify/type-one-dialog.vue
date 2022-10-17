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
        size="default"
        :rules="rules"
        :model="formData"
        require-asterisk-position="right"
        label-width="150px"
        label-position="left">
        <el-form-item
          label-width="100px"
          prop="categoryName"
          label="分类名称">
          <el-input
            v-model="formData.categoryName"
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
  import * as apis from '@/apis/index'
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })
  const { show } = toRefs(props)
  const emit = defineEmits(['update:show', 'onReload'])
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
    categoryName: [{ required: true, message: '请选择类型名称', trigger: 'blur' }]
  })
  // 按钮加载
  const btnLoading = ref(false)
  // 表单实例
  const formRef = ref(null)
  // 表单数据
  const formData = ref({
    categoryName: ''
  })
  const submitForm = (formRef) => {
    formRef.validate((valid) => {
      if (valid) {
        btnLoading.value = true
        createCategory()
      }
    })
  }
  // 新增分类
  const createCategory = () => {
    apis
      .createCategory(formData.value)
      .then((res) => {
        if (res.data.code === 0) {
          ElMessage({
            message: '添加成功',
            type: 'success'
          })
          emit('onReload')
          $show.value = false
        } else {
          ElMessage.error({ message: res.data.msg })
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        btnLoading.value = false
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
