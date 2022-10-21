<template>
  <div class="classification">
    <cool-title :title="`述求分类(${cityInfo.name})`"></cool-title>
    <div class="title box-flex"> <span>述求分类</span> <span>受理量</span> </div>
    <div class="box">
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
  },
  cityInfo: {
    type: Object,
    default: {
      name: '全市',
      value: 0
    }
  }
})

</script>

<style lang="scss" scoped>
.box-flex {
  display: flex;
  justify-content: space-between;
}

.title {
  color: #159aff;
  margin: 10px 0;
}

.classification {
  height: 100%;
}

.box {
  height: 70%;
  width: 95%;
  margin: 0 auto;
  overflow: auto;
}

.disc {
  color: #fff;
  font-size: 0.25rem;
}

.ebox-slider {
  margin-top: 10px;
}

::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: #09192b;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #09192b;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #c8c8c82d;
}
</style>
