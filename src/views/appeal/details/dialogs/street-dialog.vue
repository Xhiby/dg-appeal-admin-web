<template>
  <div>
    <el-dialog
      v-model="$show"
      title="街道办理"
      width="30%"
      @open="open">
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
            prop="transfer"
            label="转办单位">
            <el-input
              v-model="formData.transfer"
              style="width: 100%"
              placeholder="请输入">
            </el-input>
          </el-form-item>
          <el-form-item
            prop="content"
            label="内容">
            <el-input
              v-model="formData.content"
              type="textarea"
              :rows="4"
              style="width: 100%"
              placeholder="请输入">
            </el-input>
          </el-form-item>
        </el-form>
      </template>
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
  import { computed, toRefs, ref, reactive } from 'vue'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['update:show', 'onReload'])
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

  const formData = ref({
    transfer: '',
    content: ''
  })
  const formRef = ref(null)

  const rules = reactive({
    transfer: [{ required: true, message: '请输入转办单位', trigger: 'blur' }],
    content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
  })
  const open = () => {
    formRef.value.resetFields()
  }
  const submit = () => {
    console.log(123)
    emit('onReload')
    $show.value = false
  }
</script>

<style lang="scss" scoped></style>
