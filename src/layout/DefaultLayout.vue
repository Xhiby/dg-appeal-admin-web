<template>
  <div class="tw-relative tw-h-full tw-w-full tw-min-w-[990px] tw-bg-[#eee]">
    <el-container class="tw-h-full">
      <el-main class="tw-bg-[#fff] tw-m-[16px] tw-p-[16px] tw-overflow-hidden">
        <router-view v-slot="{ Component, route }">
          <div class="tw-bg-white tw-overflow-x-hidden tw-overflow-y-auto tw-h-full tw-relative">
            <component
              :is="Component"
              :key="route.path">
            </component>
          </div>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    components: {},
    setup() {
      return {}
    }
  })
</script>

<style lang="scss" scoped></style>
