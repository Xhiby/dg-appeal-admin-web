<template>
  <div>
    <cool-title title="述求分类(虎门)"></cool-title>
    <div>
      <div class="title box-flex"> <span>述求分类</span> <span>受理量</span> </div>

      <div class="ebox-slider" v-for="(item,index) in apealList" :key="index">
        <div class="disc box-flex"> <span>{{item.departName}}</span> <span>{{item.number}}</span> </div>
        <el-slider :model-value="item.number"></el-slider>
      </div>
     
    </div>
  </div>
</template>

<script setup>
  import CoolTitle from '@/components/cool-title.vue'

  const props = defineProps({
    apealList: {
    type: Array,
    default: []
  }
})

</script>

<style lang="scss" scoped>
  .box-flex {
    display: flex;
    display: flex;

    justify-content: space-between;
  }

  .title {
    color: #159aff;
    margin: 10px 0;
  }

  .disc {
    color: #fff;
    font-size: 0.25rem;
  }

  .ebox-slider {
    margin-top: 10px;
  }
</style>
