<template>
  <div v-loading="loading">
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
            prop="departmentId"
            label="转办单位">
            <el-select
              v-model="formData.departmentId"
              style="width: 326px"
              placeholder="请选择单位">
              <el-option
                v-for="item in departments"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="handleContent"
            label="内容">
            <el-input
              v-model="formData.handleContent"
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
import { computed, toRefs, ref, reactive, onMounted, toRaw } from 'vue'
  import { getAllDepartment } from '@/apis/appeal-crud'
  import { ElMessage } from 'element-plus'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })
  const emit = defineEmits(['update:show', 'confirm'])
  const loading = ref(false)
  const departments = ref([])
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
    departmentId: '',
    handleContent: ''
  })
  const formRef = ref(null)

  const rules = reactive({
    departmentId: [{ required: true, message: '请选择转办单位', trigger: 'blur' }],
    handleContent: [{ required: true, message: '请输入转办内容', trigger: 'blur' }]
  })

  const fetchAllDepartmentByType = () => {
    loading.value = true
    getAllDepartment({ departmentType: 1 })
      .then((res) => {
        loading.value = false
        if (res.data.code === 0) {
          departments.value = res.data.data
        } else {
          ElMessage.error({ message: res.data.msg })
        }
      })
      .catch((err) => {
        loading.value = false
        console.log(err)
      })
  }

  onMounted(async () => {
    await fetchAllDepartmentByType()
  })

  const open = () => {
    formRef.value.resetFields()
  }
  const submit = () => {
    formRef.value.validate((valid) => {
      if (valid) {
        const appealPayload = toRaw(formData.value)
        emit('confirm', appealPayload)
      }
    })
    $show.value = false
  }
</script>

<style lang="scss" scoped></style>
