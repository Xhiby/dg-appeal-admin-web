<template>
  <div class="cool_Photo">
    <div class="item item_1">
      <img src="@/assets/images/cool/sqtj.png" />
      <span class="time"> <span class="date">2022.09.27</span> <span class="week">星期二</span> 18:32:16 </span>
    </div>

    <div class="item item_2">
      <DepData></DepData>
    </div>
    <div class="item item_3">
      <appeals-classification></appeals-classification>
    </div>

    <div class="item item_4">
      <cumulative-appeals></cumulative-appeals>
    </div>
    <div class="item item_5">
      <!-- <big-sreen-map></big-sreen-map> -->
    </div>
    <div class="item item_6">
      <key-appeals></key-appeals>
    </div>
    <div class="item item_7">
      <!-- https://zhuanlan.zhihu.com/p/342424311 -->
      <appeal-statistics></appeal-statistics>
    </div>
    <div class="item item_8">
      <quantity-statistics></quantity-statistics>
    </div>
    <div class="item item_9">
      <satisfaction-statistics></satisfaction-statistics>
    </div>
  </div>
</template>

<script setup>
  import DepData from './component/dep-data.vue'
  import AppealsClassification from './component/appeals-classification.vue'
  // import BigSreenMap from './component/big-sreen-map.vue'
  import CumulativeAppeals from './component/cumulative-appeals.vue'
  import KeyAppeals from './component/key-appeals.vue'
  import AppealStatistics from './component/appeal-statistics.vue'
  import QuantityStatistics from './component/quantity-statistics.vue'
  import SatisfactionStatistics from './component/satisfaction-statistics.vue'
  import * as apis from '@/apis/index'
  import { ElMessage } from 'element-plus'
  import { ref, onMounted } from 'vue'

  onMounted(() => {
    initData(0)
  })
  // 表格加载图标
  const loading = ref(false)
  const initData = (streetId) => {
    loading.value = true

    apis
      .getGovernmentOverview({ streetId })
      .then((res) => {
        if (res.data.code === 0) {
          console.log(res.data, 'res.data==')
        } else {
          ElMessage.error({ message: res.data.msg })
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        loading.value = false
      })
  }
</script>

<style lang="scss" scoped>
  .cool_Photo {
    // width: 100vw;
    // height: 100vh;
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

      background-image: url(@/assets/images/cool/img_bt.png);
      background-repeat: no-repeat;
      background-size: auto;
      position: relative;

      img {
        margin: 0 auto;
      }
      .time {
        position: absolute;
        color: #fff;
        top: 25px;
        right: 20px;
        .date {
          color: #45a2ff;
        }
        .week {
          color: #45a2ff;
          margin-left: 8px;
          margin-right: 8px;
        }
      }
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
