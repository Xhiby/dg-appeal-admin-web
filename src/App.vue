<template>
  <el-config-provider :locale="zhCn">
    <div
      v-if="showMenu"
      class="menu_btn">
      <el-dropdown>
        <el-button
          type="primary"
          size="small">
          菜单导航
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <RouterLink to="/cool">大屏可视化</RouterLink>
            </el-dropdown-item>
            <el-dropdown-item>
              <RouterLink to="/appeal-preview">概览</RouterLink>
            </el-dropdown-item>
            <el-dropdown-item>
              <RouterLink to="/appeal-leader-manager">诉求列表【领导视图】</RouterLink>
            </el-dropdown-item>
            <el-dropdown-item>
              <RouterLink to="/appeal">诉求列表【处理，市倍增办】</RouterLink>
            </el-dropdown-item>
            <el-dropdown-item>
              <RouterLink to="/appeal/dashboard">诉求统计</RouterLink>
            </el-dropdown-item>
            <el-dropdown-item>
              <RouterLink to="/log-manage">日志管理</RouterLink>
            </el-dropdown-item>
            <el-dropdown-item>
              <RouterLink to="/appeal-deploy">诉求配置</RouterLink>
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

  console.log(import.meta.env.VITE_APP_ENV)
  const showMenu = computed(() => {
    return import.meta.env.VITE_APP_ENV === 'dev' || import.meta.env.VITE_APP_ENV === 'stage'
  })
</script>

<style lang="scss">
  #app {
    width: 100%;
    height: 100%;
    background-color: #eeeeee;
    .menu_btn {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1000;
    }
  }
</style>
