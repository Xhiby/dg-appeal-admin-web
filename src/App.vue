<template>
  <el-config-provider :locale="zhCn">
    <div
      v-if="showMenu === '1'"
      class="menu_btn">
      <el-dropdown trigger="click">
        <el-button
          type="primary"
          size="small">
          菜单导航
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <RouterLink to="/dashboard">概览</RouterLink>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
  import zhCn from 'element-plus/lib/locale/lang/zh-cn'
  import { computed } from 'vue'

  const showMenu = computed(() => {
    return import.meta.env.VITE_IS_OPEN_MENU
  })
</script>

<style lang="scss">
  #app {
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
    padding: 20px;
    .menu_btn {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1000;
    }
  }
</style>
