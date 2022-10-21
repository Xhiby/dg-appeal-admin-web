<template>
  <div>
    <el-dialog
      v-model="$show"
      title="确认转回市倍增办"
      width="30%">
      <span>此诉求将转回倍增办从新处理，请确认您的操作！</span>
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
  const submit = () => {
    emit('confirm', [])
    $show.value = false
  }
</script>

<style lang="scss" scoped></style>
