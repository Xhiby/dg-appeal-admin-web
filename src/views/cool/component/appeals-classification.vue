<template>
  <div>
    <cool-title title="述求分类(虎门)"></cool-title>
    <div>
      <div class="title box-flex"> <span>述求分类</span> <span>受理量</span> </div>

      <div class="ebox-slider">
        <div class="disc box-flex"> <span>土地要素</span> <span>3730</span> </div>
        <el-slider :model-value="23"></el-slider>
      </div>
      <div class="ebox-slider">
        <div class="disc box-flex"> <span>土地要素</span> <span>3730</span> </div>
        <el-slider :model-value="23"></el-slider>
      </div>
      <div class="ebox-slider">
        <div class="disc box-flex"> <span>土地要素</span> <span>3730</span> </div>
        <el-slider :model-value="23"></el-slider>
      </div>
      <div class="ebox-slider">
        <div class="disc box-flex"> <span>土地要素</span> <span>3730</span> </div>
        <el-slider :model-value="23"></el-slider>
      </div>
      <div class="ebox-slider">
        <div class="disc box-flex"> <span>土地要素</span> <span>3730</span> </div>
        <el-slider :model-value="23"></el-slider>
      </div>
    </div>
  </div>
</template>

<script setup>
  import CoolTitle from '@/components/cool-title.vue'
</script>

<style lang="scss" scoped>
  .box-flex {
    display: flex;
    display: flex;

    justify-content: space-between;
  }

  .title {
    color: #159aff;
  }

  .disc {
    color: #fff;
    font-size: 0.25rem;
  }

  .ebox-slider {
    margin-top: 10px;
  }
</style>
