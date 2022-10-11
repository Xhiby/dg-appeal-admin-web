<template>
  <h1>{{ title }}</h1>
</template>

<script setup>
  import { toRefs } from 'vue'

  const props = defineProps({
    title: {
      type: String,
      default: ''
    }
  })

  const { title } = toRefs(props)
</script>

<style lang="scss" scoped>
  h1 {
    position: relative;
    font-size: 30px;
    font-weight: 500;
    color: #214cba;
    padding-left: 19px;
    &::before {
      position: absolute;
      top: 50%;
      left: 0px;
      transform: translateY(-50%);
      content: '';
      display: block;
      width: 7px;
      height: 22px;
      background: #214cb9;
      margin-right: 12px;
    }
  }
</style>
