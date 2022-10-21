<template>
  <div>
    <el-dialog
      v-model="$show"
      title="确认接单"
      width="30%">
      <span>接受诉求后，您需要在指定时限内处理完成！请确认您的操作</span>
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
  import { computed, toRefs } from 'vue'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['update:show', 'confirm'])
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
  const submit = async () => {
    emit('confirm', [])
    $show.value = false
  }
</script>

<style lang="scss" scoped></style>
