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
        label-position="left">
        <el-row
          :gutter="48"
          style="padding-bottom: 20px">
          <el-col :span="4">办理人:</el-col>
          <el-col :span="4">赵思</el-col>
        </el-row>
        <el-form-item
          v-for="(item, index) in 3"
          :key="index"
          label="日志1"
          label-width="78px">
          <el-input
            type="textarea"
            value="2016年12月30日，网易传媒针对29日内部动员大会上宣布的各频道被取消，成立直播事业群一事进行了详细公示，公示显示各内容频道整体合并为新闻中心，负责网易有态度的原创内容、新闻建设等工作；同时，合并直播、娱乐、时尚、科技、公开课为直播事业中心"
            disabled="">
          </el-input>
          <p>处理时效{{ index + 1 }}: <span class="tw-ml-[25px]">24小时</span></p>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button
        size="large"
        type="primary"
        @click="onClose">
        确认
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, computed, toRefs } from 'vue'
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    logCode: {
      type: Number,
      default: 0
    }
  })
  const { show, logCode } = toRefs(props)
  const emit = defineEmits(['update:show'])
  const $show = computed({
    get() {
      return show.value
    },
    set(val) {
      emit('update:show', val)
    }
  })
  // 表单实例
  const formRef = ref(null)
  // 表单数据
  // const formData = ref({})
  // 打开dialog时回调函数
  const onOpen = () => {
    console.log(logCode)
  }


  // 关闭dialog时回调函数
  const onClose = () => {
    $show.value = false
  }
</script>

<style lang="scss" scoped></style>
