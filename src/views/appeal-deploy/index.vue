<template>
  <div class="page_main">
    <PageTitle
      class="tw-mb-[40px]"
      title="诉求配置">
    </PageTitle>
    <el-tabs
      v-model="activeTab"
      class="my-el-tabs">
      <el-tab-pane
        lazy
        label="诉求分类"
        name="classify">
        <AppealClassify></AppealClassify>
      </el-tab-pane>
      <el-tab-pane
        lazy
        label="诉求部门"
        name="department">
        <AppealDepartment></AppealDepartment>
      </el-tab-pane>
      <el-tab-pane
        lazy
        label="诉求标签"
        name="tag">
        <AppealTag></AppealTag>
      </el-tab-pane>
      <el-tab-pane
        lazy
        label="诉求黑名单"
        name="blacklist">
        <AppealBlackList></AppealBlackList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import PageTitle from '@/components/page-title.vue'
  import AppealBlackList from './appeal-blacklist.vue'
  import AppealClassify from './appeal-classify.vue'
  import AppealDepartment from './appeal-department.vue'
  import AppealTag from './appeal-tag.vue'
  const activeTab = ref('classify')
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
