<template>
  <div class="breadcrumb">
    <el-icon
      class="icon_back"
      :size="22"
      @click="onBack">
      <Back></Back>
    </el-icon>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="item in list"
        :key="item.path"
        :to="item.path ? { path: item.path } : undefined">
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
  import { toRefs } from 'vue'
  import { useRouter } from 'vue-router'

  const props = defineProps({
    list: {
      type: Array,
      default: () => []
    }
  })

  const { list } = toRefs(props)

  const router = useRouter()
  const onBack = () => {
    router.go(-1)
  }
</script>

<style lang="scss" scoped>
  .breadcrumb {
    display: flex;
    height: 30px;
    align-items: center;
    .icon_back {
      cursor: pointer;
      margin-right: 10px;
      &:hover {
        color: #4584f8;
      }
    }
    :deep(.el-breadcrumb) {
      .el-breadcrumb__item > span {
        line-height: 28px;
        font-size: 18px;
        color: #8c8c8c;
        letter-spacing: 0;
        font-weight: 500;
        &:hover {
          color: #4584f8;
        }
      }
      .el-breadcrumb__item[aria-current='page'] > span {
        line-height: 28px;
        font-size: 18px;
        color: #575757;
        letter-spacing: 0;
        font-weight: 500;
      }
    }
  }
</style>
