<template>
  <el-dialog
    v-model="$show"
    width="480px"
    @close="onClose">
    <el-form
      ref="ruleForm"
      :model="formData"
      :rules="rules">
      <el-form-item
        label="街镇部门"
        prop="depName">
        <el-input
          v-model="formData.depName"
          placeholder="请输入">
        </el-input>
      </el-form-item>

      <el-form-item
        label="服务专员"
        prop="service">
        <el-select
          v-model="formData.service"
          placeholder="请选择"
          class="tw-w-full">
          <el-option></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button
          type="primary"
          @click="onConfirm(ruleForm)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import { reactive, ref, toRefs, computed } from 'vue'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })

  const { show } = toRefs(props)

  const emit = defineEmits(['update:show'])

  const ruleForm = ref(null)

  const formData = ref({
    depName: '',
    service: []
  })

  const rules = reactive({
    depName: [{ require: true, message: '', trigger: 'blur' }],
    service: [{ require: true, message: '', trigger: 'blur' }]
  })

  const $show = computed({
    get() {
      return show.value
    },
    set(val) {
      emit('update:show', val)
    }
  })

  // 关闭dialog回调
  // const onClose = () => {
  //   show.value = false
  // }

  // 取消
  const onCancel = () => {
    $show.value = false
  }

  // 确定
  const onConfirm = () => {
    onCancel()
  }
</script>

<style scoped></style>
