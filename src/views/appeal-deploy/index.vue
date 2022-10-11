<template>
  <div class="page_main">
    <PageTitle
      class="tw-mb-[40px]"
      title="用户反馈">
    </PageTitle>
    <el-tabs
      v-model="activeTab"
      class="my-el-tabs">
      <el-tab-pane
        lazy
        label="诉求分类"
        name="feedback">
        <FeedbackTable></FeedbackTable>
      </el-tab-pane>
      <el-tab-pane
        lazy
        label="诉求部门"
        name="complaint">
        <ComplaintTable></ComplaintTable>
      </el-tab-pane>
      <el-tab-pane
        lazy
        label="诉求标签"
        name="complaint">
        <ComplaintTable></ComplaintTable>
      </el-tab-pane>
      <el-tab-pane
        lazy
        label="诉求黑名单"
        name="complaint">
        <ComplaintTable></ComplaintTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import PageTitle from '@/components/page-title.vue'
  const activeTab = ref('feedback')
</script>

<style lang="scss" scoped>
  .page_main {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 15px 20px;
    overflow: auto;
  }
</style>
