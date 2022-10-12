<template>
  <el-menu
    class="sidebar-container"
    :default-active="activeLeader"
    @select="handleMenuSelect">
    <el-menu-item
      v-for="menu in commonStore.leaders"
      :key="menu.id"
      :index="menu.id"
      class="tw-justify-center">
      {{ menu.name }}
    </el-menu-item>
  </el-menu>
</template>

<script setup>
  // import { useRouter } from 'vue-router'
  import { useCommonStore } from '@/stores/common'
  import { computed } from 'vue'

  // const router = useRouter()
  const commonStore = useCommonStore()

  const activeLeader = computed(() => {
    return commonStore.currentLeader === '' ? commonStore.defaultLeader : commonStore.currentLeader
  })

  function handleMenuSelect(leaderId) {
    commonStore.$patch({
      currentLeader: leaderId
    })
  }
</script>

<style lang="scss">
  .side-menu:not(.n-menu--collapsed) {
    .n-menu-item-content {
      &::before {
        left: 5px;
        right: 5px;
      }
      &.n-menu-item-content--selected,
      &:hover {
        &::before {
          border-left: 4px solid var(--primaryColor);
        }
      }
    }
  }

  .sidebar-container {
    border-right: 1px solid #eee;
    width: calc(100% - 32px);
    background-color: #fff;
    height: calc(100% - 94px);
    margin-top: 16px;
    margin-left: 16px;
    margin-right: 16px;
    font-size: 0;
    top: 0;
    bottom: 0;
    z-index: 1800;
    overflow: hidden;
  }
</style>
