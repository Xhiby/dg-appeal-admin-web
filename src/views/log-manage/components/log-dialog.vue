<template>
  <el-dialog
    v-model="$show"
    class="my-el-dialog-header-span"
    width="650px"
    @open="onOpen"
    @close="onClose">
    <template #header>
      <h1>日志记录</h1>
    </template>
    <template #default>
      <el-form
        ref="formRef"
        class="tw-px-[10px]"
        size="large"
        label-width="150px"
        label-position="left"
        :model="formData">
        <el-row style="padding-bottom: 20px">
          <el-col :span="4">办理人:</el-col>
          <el-col :span="4">赵思</el-col>
        </el-row>
        <el-form-item
          v-for="(item, index) in formData.tableData"
          :key="index"
          prop="logContent"
          label="日志1"
          label-width="78px">
          <el-input
            v-model="item.logContent"
            type="textarea"
            :rows="4"
            :autosize="{ minRows: 2, maxRows: 6 }">
          </el-input>
          <p>处理时效{{ index + 1 }}: <span class="tw-ml-[25px]">24小时</span></p>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button
        size="default"
        @click="onClose">
        返回
      </el-button>
      <el-button
        size="default"
        type="primary"
        @click="onSubmit">
        保存修改
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, computed, toRefs, reactive } from 'vue'
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    logList: {
      type: Array,
      default: () => []
    }
  })
  const { show, logList } = toRefs(props)
  const emit = defineEmits(['update:show', 'onReload'])
  const $show = computed({
    get() {
      return show.value
    },
    set(val) {
      emit('update:show', val)
    }
  })
  const formData = reactive({
    name: '',
    tableData: []
  })
  // 表单实例
  const formRef = ref(null)
  // 表单数据
  // const formData = ref({})
  // 打开dialog时回调函数
  const onOpen = () => {
    formData.tableData = ref(JSON.parse(JSON.stringify(logList.value)))
    console.log(logList.value)
  }

  // 关闭dialog时回调函数
  const onClose = () => {
    $show.value = false
  }
  //提交日志记录
  const onSubmit = () => {
    formRef.value.validate((valid) => {
      if (valid) {
        console.log(formData.tableData)
        onClose()
      }
    })
  }
</script>

<style lang="scss" scoped></style>
