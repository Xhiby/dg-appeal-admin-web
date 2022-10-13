<template>
  <el-dialog
    v-model="$show"
    class="my-el-dialog-header-span"
    width="650px"
    @open="onOpen"
    @close="onClose">
    <template #header>
      <h1>新增子类</h1>
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
          prop="type"
          label="诉求分类">
          <el-select
            v-model="formData.type"
            style="flex-grow: 1"
            placeholder="请选择诉求分类">
            <el-option
              v-for="(item, index) in appealTypeList"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="name"
          label="子类名称">
          <el-input
            v-model="formData.name"
            style="width: 100%"
            placeholder="请输入子类名称">
          </el-input>
        </el-form-item>
        <el-form-item
          prop="pjsx"
          label="评价时限">
          <el-input
            v-model="formData.pjsx"
            style="width: 100%"
            placeholder="请输入评价时限">
          </el-input>
        </el-form-item>
        <el-form-item
          prop="sqqssx"
          label="诉求签收时限">
          <el-input
            v-model="formData.sqqssx"
            style="width: 100%"
            placeholder="请输入诉求签收时限">
          </el-input>
        </el-form-item>
        <el-form-item
          prop="sqclsx"
          label="诉求处理时限">
          <el-input
            v-model="formData.sqclsx"
            style="width: 100%"
            placeholder="请输入诉求处理时限">
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
  import { appealTypeList } from '@/config/global-var'
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
    type: [{ required: true, message: '请选择诉求分类', trigger: 'change' }],
    name: [{ required: true, message: '请选择类型名称', trigger: 'blur' }],
    pjsx: [{ required: true, message: '请选择类型名称', trigger: 'blur' }],
    sqqssx: [{ required: true, message: '请选择类型名称', trigger: 'blur' }],
    sqclsx: [{ required: true, message: '请选择类型名称', trigger: 'blur' }]
  })
  // 按钮加载
  const btnLoading = ref(false)
  // 表单实例
  const formRef = ref(null)
  // 表单数据
  const formData = ref({
    id: 0,
    type: '',
    name: '',
    pjsx: '',
    sqqssx: '',
    sqclsx: ''
  })
  const submitForm = (formRef) => {
    formRef.validate((valid) => {
      if (valid) {
        btnLoading.value = true
        setTimeout(() => {
          btnLoading.value = false
          $show.value = false
          ElMessage.success('新增成功')
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
