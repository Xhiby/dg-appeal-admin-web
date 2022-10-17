<template>
  <div class="tw-flex tw-w-full">
    <div class="blue"></div>
    <div class="title_box">
      <div class="title_box_left">
        <div class="sanjiao"></div>
      </div>
      <h1>{{ props.title }}</h1>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      default: '炫酷标题'
    }
  })
</script>

<style lang="scss" scoped>
  .blue {
    width: 4px;
    height: 50px;
    background: #1b7ef2;
    margin-right: 3px;
  }
  .title_box {
    width: 100%;
    display: flex;
    align-items: center;
    background: repeating-linear-gradient(to right, #051325, #0c2747);
    & > h1 {
      font-size: 24px;
      font-weight: bold;
      color: #fff;
      text-shadow: 0px 0px 15px rgba(27, 126, 242, 0.91);
    }
    &_left {
      width: 40px;
      display: flex;
      padding-left: 6px;
      align-items: center;
      .sanjiao {
        width: 0;
        height: 0;
        border-left: 10px solid skyblue;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
      }
    }
  }
</style>
