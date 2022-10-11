<template>
  <div class="tw-mx-auto">
    <h1 class="tw-font-bold">vue</h1>
    <el-button type="primary">首页</el-button>

    <div
      v-loading="true"
      class="tw-w-[200px] tw-h-[200px]">
    </div>

    <el-button @click="dialogVisible = true"> click to open the Dialog </el-button>

    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose">
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-row>
      <el-col :span="12">
        <el-icon><Plus></Plus></el-icon>
      </el-col>
      <el-col :span="12">
        <el-icon><Minus></Minus></el-icon>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { ElMessageBox } from 'element-plus'

  const dialogVisible = ref(false)

  const handleClose = (done) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
  }
</script>

<style lang="scss" scoped></style>
