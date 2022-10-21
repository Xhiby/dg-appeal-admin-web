<!-- 编辑需求弹框 -->
<template>
  <el-dialog
    v-model="showDialog"
    width="600px"
    :align-center="true"
    @close="onClose">
    <template #header>
      <h1>编辑</h1>
    </template>
    <template #default>
      <el-form
        ref="serviceFormRef"
        class="tw-px-[10px]"
        size="large"
        label-position="left"
        label-width="100px"
        :model="serviceForm"
        :rules="formRules">
        <el-form-item
          prop="labelCode"
          label="标签">
          <el-select
            v-model="serviceForm.labelCode"
            style="width: 326px"
            placeholder="请选择领">
            <el-option
              v-for="item in appealsLabels"
              :key="item.labelCode"
              :label="item.labelName"
              :value="item.labelCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="childCategoryCode"
          label="分类">
          <el-tree-select
            v-model="serviceForm.childCategoryCode"
            :data="appealCategories"
            :render-after-expand="false"
            style="width: 326px"
            placeholder="请选择诉求分类"
            @node-click="(node, nodeProps) => handleNodeClick(nodeProps)">
          </el-tree-select>
        </el-form-item>
      </el-form>
    </template>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button
          type="primary"
          :loading="sureLoading"
          @click="onConfirm">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
  import { onMounted, reactive, ref, toRaw, watch } from 'vue'
  import { getAllAppealCategories, getAppealsLabels } from '@/apis/appeal-crud'
  import { ElMessage } from 'element-plus'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })

  const serviceFormRef = ref(null)
  const showDialog = ref(props.show)
  const appealsLabels = ref([])
  const appealCategories = ref([])
  const sureLoading = ref(false)
  const currentSelectedParentNode = ref('')
  const serviceForm = reactive({
    labelCode: '',
    childCategoryCode: ''
  })
  const formRules = reactive({
    labelCode: [{ required: true, message: '请选择诉求领导标签', trigger: 'blur' }],
    childCategoryCode: [{ required: true, message: '请选择诉求分类', trigger: 'blur' }]
  })

  const emit = defineEmits(['confirm', 'close'])

  const recursiveCategories = (categories) => {
    categories.forEach((cate) => {
      cate.value = cate.categoryCode
      cate.label = cate.categoryName
      if (cate.children && cate.children.length) {
        recursiveCategories(cate.children)
      }
    })
  }

  const fetchAppealsLabels = () => {
    getAppealsLabels()
      .then((res) => {
        if (res.data.code === 0) {
          appealsLabels.value = res.data.data
        } else {
          ElMessage.error({ message: res.data.msg })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const fetchAppealsCategories = () => {
    getAllAppealCategories()
      .then((res) => {
        if (res.data.code === 0) {
          const data = res.data.data
          recursiveCategories(data)
          appealCategories.value = data
        } else {
          ElMessage.error({ message: res.data.msg })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  watch(props, () => {
    showDialog.value = props.show
  })

  onMounted(() => {
    fetchAppealsLabels()
    fetchAppealsCategories()
  })

  const handleNodeClick = (nodeProps) => {
    const currentNodeContext = toRaw(nodeProps)
    if (currentNodeContext.isLeaf) {
      const parentNode = toRaw(currentNodeContext.parent)
      currentSelectedParentNode.value = parentNode.data.categoryCode
    }
  }

  const onConfirm = async () => {
    serviceFormRef.value.validate((valid) => {
      if (valid) {
        const appealPayload = toRaw(serviceForm)
        appealPayload.categoryCode = currentSelectedParentNode.value
        emit('confirm', appealPayload)
      }
    })
  }

  const onClose = () => {
    emit('close', [])
  }

  const onCancel = () => {
    emit('close', [])
  }
</script>

<style lang="scss">
  .dg-split-task-tab {
    .el-tabs__header {
      .el-tabs__nav-wrap {
        &::after {
          display: none;
        }
      }
      .el-tabs__item {
        padding: 0 10px;
      }
      .el-tabs__item .is-icon-close {
        position: relative;
        top: 2px;
        width: 0;
        height: 1em;
      }
      .el-tabs__item.is-active .is-icon-close {
        width: 14px;
      }
    }
  }
</style>
