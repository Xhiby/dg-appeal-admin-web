<!-- 诉求部门编辑弹窗 -->
<template>
  <div>
    <el-dialog v-model="isShow" title="编辑">
      <el-form :model="ruleFormDep" :rules="rulesDep" status-icon>
        <el-form-item label="街镇部门" prop="depName">
          <el-input v-model="ruleFormDep.depName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="服务专员" prop="service">
          <el-input v-model="ruleFormDep.service" placeholder="请输入" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="Cancel">取消</el-button>
          <el-button type="primary" @click="Confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

import { useMockTableData } from '@/utils/hooks'

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const props = defineProps({
  isShow: false,
  data: {}
})

const ruleFormDep = reactive({
  depName: '',
  service: ''
})

const rulesDep = reactive({
  depName: [{ required: true, message: '', trigger: 'blur' }],
  service: [{ required: true, message: '', trigger: 'blur' }]
})

const Cancel = () => {
  dialogStatus.isShow = false
}

const Confirm = () => {
  dialogStatus.isShow = false
}

onMounted(() => {
  console.log(props.data)
})
</script>

<style>
</style>