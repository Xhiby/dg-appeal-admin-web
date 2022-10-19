<!-- 诉求拆分任务弹窗 -->
<template>
  <el-dialog
    v-model="showDialog"
    width="600px"
    :align-center="true"
    @close="onClose">
    <template #header>
      <h1>诉求拆分</h1>
    </template>
    <template #default>
      <el-tabs
        v-model="currentAppealTaskTab"
        editable
        class="dg-split-task-tab"
        @tab-remove="handleTaskRemoved"
        @edit="handleEditTaskTabs">
        <el-tab-pane
          v-for="(taskTab, idx) in appealTaskTabs"
          :key="taskTab.name"
          :label="taskTab.title"
          :name="taskTab.name">
          <appeal-form
            :key="taskTab.name"
            ref="appealTaskFormsRef"
            :appeal-id="`${idx}`">
          </appeal-form>
        </el-tab-pane>
      </el-tabs>
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
  import { ref, toRaw, watch } from 'vue'
  import AppealForm from '../components/AppealForm.vue'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  })

  let tabIndex = 1
  const appealTaskFormsRef = ref([])
  const showDialog = ref(props.show)
  const currentAppealTaskTab = ref('1')
  const appealTaskTabs = ref([
    {
      title: '新诉求-1',
      name: '1'
    }
  ])

  const emit = defineEmits(['confirm', 'close'])

  watch(props, () => {
    showDialog.value = props.show
  })

  const sureLoading = ref(false)

  const onConfirm = async () => {
    const tasks = []
    for (const taskForm of appealTaskFormsRef.value) {
      if (taskForm) {
        tasks.push(await taskForm.getFormData())
      }
    }
    emit('confirm', tasks)
  }

  const onClose = () => {
    emit('close', [])
  }

  const onCancel = () => {
    emit('close', [])
  }

  const handleTaskRemoved = (tabName) => {
    console.log(tabName)
  }

  const handleEditTaskTabs = (targetName, action) => {
    if (action === 'add') {
      const newTabName = `${++tabIndex}`
      appealTaskTabs.value.push({
        title: `新诉求-${newTabName}`,
        name: newTabName
      })
      currentAppealTaskTab.value = newTabName
    }
    if (action === 'remove') {
      const tabs = appealTaskTabs.value
      let activeName = currentAppealTaskTab.value
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      if (targetName !== '1') {
        currentAppealTaskTab.value = activeName
        appealTaskTabs.value = tabs.filter((tab) => tab.name !== targetName)
      }
    }
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
