<template>
  <div class="cool_Photo">
    <div
      class="item item_1"
      style="background-color: saddlebrown">
    </div>
    <div
      class="item item_2"
      style="background-color: salmon">
    </div>
    <div
      class="item item_3"
      style="background-color: seagreen">
    </div>
    <div
      class="item item_4"
      style="background-color: skyblue">
    </div>
    <div
      class="item item_5"
      style="background-color: springgreen">
    </div>
    <div
      class="item item_6"
      style="background-color: sienna">
    </div>
    <div
      class="item item_7"
      style="background-color: blueviolet">
    </div>
    <div
      class="item item_8"
      style="background-color: violet">
    </div>
    <div
      class="item item_9"
      style="background-color: aqua">
    </div>
  </div>
</template>

<script setup>
  // import CoolTitle from '@/components/cool-title.vue'
</script>

<style lang="scss" scoped>
  .cool_Photo {
    width: 100%;
    height: 100%;
    background-color: #09192b;
    display: grid;
    grid-template-columns: repeat(384, 5px);
    grid-template-rows: repeat(216, 5px);

    .item_1 {
      // 行开始
      grid-row-start: 1;
      // 列开始
      grid-column-start: 1;
      // 行结束
      grid-row-end: 16;
      //列结束
      grid-column-end: 384;
    }
    .item_2 {
      // 行开始
      grid-row-start: 21;
      // 列开始
      grid-column-start: 5;
      // 行结束
      grid-row-end: 90;
      //列结束
      grid-column-end: 109;
    }
    .item_3 {
      // 行开始
      grid-row-start: 94;
      // 列开始
      grid-column-start: 5;
      // 行结束
      grid-row-end: 170;
      //列结束
      grid-column-end: 109;
    }
    .item_4 {
      // 行开始
      grid-row-start: 174;
      // 列开始
      grid-column-start: 5;
      // 行结束
      grid-row-end: 216;
      //列结束
      grid-column-end: 109;
    }
    .item_5 {
      // 行开始
      grid-row-start: 21;
      // 列开始
      grid-column-start: 118;
      // 行结束
      grid-row-end: 161;
      //列结束
      grid-column-end: 266;
    }
    .item_6 {
      // 行开始
      grid-row-start: 164;
      // 列开始
      grid-column-start: 118;
      // 行结束
      grid-row-end: 216;
      //列结束
      grid-column-end: 266;
    }

    .item_7 {
      // 行开始
      grid-row-start: 21;
      // 列开始
      grid-column-start: 276;
      // 行结束
      grid-row-end: 80;
      //列结束
      grid-column-end: 379;
    }

    .item_8 {
      // 行开始
      grid-row-start: 87;
      // 列开始
      grid-column-start: 276;
      // 行结束
      grid-row-end: 144;
      //列结束
      grid-column-end: 379;
    }
    .item_9 {
      // 行开始
      grid-row-start: 150;
      // 列开始
      grid-column-start: 276;
      // 行结束
      grid-row-end: 216;
      //列结束
      grid-column-end: 379;
    }
  }
</style>
