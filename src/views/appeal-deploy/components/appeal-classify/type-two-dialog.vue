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
        size="default"
        :rules="rules"
        :model="formData"
        require-asterisk-position="right"
        label-width="150px"
        label-position="left">
        <el-form-item
          prop="categoryCode"
          label="诉求分类">
          <el-select
            v-model="formData.categoryCode"
            style="flex-grow: 1"
            placeholder="请选择诉求分类">
            <el-option
              v-for="(item, index) in appealTypeList"
              :key="index"
              :label="item.categoryName"
              :value="item.categoryCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="childCategoryName"
          label="子类名称">
          <el-input
            v-model="formData.childCategoryName"
            style="width: 100%"
            placeholder="请输入子类名称">
          </el-input>
        </el-form-item>
        <el-form-item
          prop="appealEvaluateLimitTime"
          label="评价时限">
          <el-input
            v-model.number="formData.appealEvaluateLimitTime"
            style="width: 100%"
            placeholder="请输入评价时限">
          </el-input>
        </el-form-item>
        <el-form-item
          prop="appealSignLimitTime"
          label="诉求签收时限">
          <el-input
            v-model.number="formData.appealSignLimitTime"
            style="width: 100%"
            placeholder="请输入诉求签收时限">
          </el-input>
        </el-form-item>
        <el-form-item
          prop="appealHandleLimitTime"
          label="诉求处理时限">
          <el-input
            v-model.number="formData.appealHandleLimitTime"
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
  import * as apis from '@/apis/index'
  import { reactive, ref, computed, toRefs } from 'vue'
  import { ElMessage } from 'element-plus'
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
    categoryCode: [{ required: true, message: '请选择诉求分类', trigger: 'change' }],
    childCategoryName: [{ required: true, message: '请选择类型名称', trigger: 'blur' }],
    appealEvaluateLimitTime: [
      { required: true, message: '请选择类型名称', trigger: 'blur' },
      { type: 'number', message: '评价时限格式为30以内的字数' },
      {
        pattern: /^([12][0-9]|30|[1-9])$/,
        message: '请输入30以内正整数',
        trigger: 'blur'
      }
    ],
    appealSignLimitTime: [
      { required: true, message: '请选择类型名称', trigger: 'blur' },
      { type: 'number', message: '签收时限格式为30以内的字数' },
      {
        pattern: /^([12][0-9]|30|[1-9])$/,
        message: '请输入30以内正整数',
        trigger: 'blur'
      }
    ],
    appealHandleLimitTime: [
      { required: true, message: '请选择类型名称', trigger: 'blur' },
      { type: 'number', message: '请输入正整数' },
      {
        pattern: /^[1-7]$/,
        message: '请填写7个工作日以内的时限',
        trigger: 'blur'
      }
    ]
  })
  // 按钮加载
  const btnLoading = ref(false)
  // 表单实例
  const formRef = ref(null)
  // 表单数据
  const formData = ref({
    //分类编号
    categoryCode: '',
    //子分类名称
    childCategoryName: '',
    //诉求评价时限
    appealEvaluateLimitTime: '',
    //诉求签收时限
    appealSignLimitTime: '',
    //诉求处理时限
    appealHandleLimitTime: ''
  })
  // 诉求分类列表
  const appealTypeList = ref([])
  const submitForm = (formRef) => {
    formRef.validate((valid) => {
      if (valid) {
        btnLoading.value = true
        createCategoryChild()
      }
    })
  }
  const getCategoryList = () => {
    apis
      .getCategoryList()
      .then((res) => {
        if (res.data.code === 0) {
          appealTypeList.value = res.data.data
        } else {
          ElMessage.error(res.data.msg)
        }
      })
      .catch((err) => console.log(err))
  }
  // 新增诉求子类
  const createCategoryChild = () => {
    apis
      .createCategoryChild(formData.value)
      .then((res) => {
        if (res.data.code === 0) {
          ElMessage.success('新增成功')
          $show.value = false
          emit('onReload')
        } else {
          ElMessage.error(res.data.msg)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        btnLoading.value = false
      })
  }
  // 打开dialog时回调函数
  const onOpen = () => {
    getCategoryList()
  }

  // 关闭dialog时回调函数
  const onClose = () => {
    formRef.value.resetFields()
  }
</script>

<style lang="scss" scoped></style>
