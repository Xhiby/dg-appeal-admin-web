<template>
  <div class="tw-relative tw-h-full tw-w-full tw-min-w-[990px] tw-bg-[#eee]">
    <el-container class="tw-h-full">
      <el-aside width="200px">
        <DGSidebar></DGSidebar>
      </el-aside>
      <el-container>
        <el-header class="tw-h-[64px] tw-flex tw-items-center tw-justify-start tw-pl-[24px] tw-bg-[#4584f8]"> </el-header>
        <el-main class="tw-bg-[#fff] tw-m-[16px] tw-p-[16px] tw-overflow-hidden">
          <router-view v-slot="{ Component, route }">
            <transition appear>
              <div class="tw-bg-white tw-overflow-x-hidden tw-overflow-y-auto tw-h-full tw-relative">
                <component
                  :is="Component"
                  :key="route.path">
                </component>
              </div>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import DGSidebar from '@/layout/components/sidebar/index.vue'

  export default defineComponent({
    components: {
      DGSidebar
    },
    setup() {
      return {}
    }
  })
</script>

<style lang="scss" scoped></style>
