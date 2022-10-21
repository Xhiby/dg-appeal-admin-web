<template>
  <div class="cool_Photo">
    <div class="item item_1">
      <img src="@/assets/images/cool/sqtj.png" />
      <top-time></top-time>
    </div>

    <div class="item item_2">
      <DepData :departmentList="departmentList" :cityInfo="cityInfo"></DepData>
    </div>
    <div class="item item_3">
      <appeals-classification :apealList="apealList" :cityInfo="cityInfo"></appeals-classification>
    </div>

    <div class="item item_4">
      <cumulative-appeals :appealsBase="appealsBase" :cityInfo="cityInfo"></cumulative-appeals>
    </div>
    <div class="item item_5">
      <big-sreen-map @cityChange="cityChange"></big-sreen-map>
    </div>
    <div class="item item_6">
      <key-appeals :percentBase="percentBase" :cityInfo="cityInfo"></key-appeals>
    </div>
    <div class="item item_7">
      <!-- https://zhuanlan.zhihu.com/p/342424311 -->
      <appeal-statistics :statisticsBase="statisticsBase" :cityInfo="cityInfo"></appeal-statistics>
    </div>
    <div class="item item_8">
      <quantity-statistics :tableDataVo="tableDataVo" :cityInfo="cityInfo"></quantity-statistics>
    </div>
    <div class="item item_9">
      <satisfaction-statistics :percentageBase="percentageBase" :cityInfo="cityInfo"></satisfaction-statistics>
    </div>
  </div>
</template>

<script setup>
import TopTime from './component/top-time.vue'
import DepData from './component/dep-data.vue'
import AppealsClassification from './component/appeals-classification.vue'
import BigSreenMap from './component/big-sreen-map.vue'
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
const departmentList = ref([])
const apealList = ref([])
const tableDataVo = ref({})

const appealsBase = ref({})
const percentBase = ref({})

const statisticsBase = ref({})
const percentageBase = ref({})

const cityInfo = ref({ name: '全市', value: 0 })

const initData = (id) => {
  loading.value = true
  apis
    .getGovernmentOverview(`/api/v1/government/overview/${id}`, {})
    .then((res) => {
      if (res.data.code === 0) {
        const data = res.data.data
        departmentList.value = data.departmentList
        apealList.value = data.apealList
        tableDataVo.value = {
          dataX: data.tableDataVo.dataX,
          dataY: data.tableDataVo.dataY
        }
        appealsBase.value = {
          appealsAccNum: data.appealsAccNum,
          appealsHandlNum: data.appealsHandlNum
        }
        percentBase.value = {
          supervisePercent: data.supervisePercent,
          highOpinionPercent: data.highOpinionPercent,
          outtimePercent: data.outtimePercent,
          multiplyDemand: data.multiplyDemand
        }

        statisticsBase.value = {
          allAppealNum: data.allAppealNum,
          pending: data.pending,
          processed: data.processed
        }

        percentageBase.value = {
          veryPleased: data.veryPleased,
          pleased: data.pleased,
          notPleased: data.notPleased
        }

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

const cityChange = (cityData) => {
  console.log(cityData, 'cityData======cityData;;;;')
  cityInfo.value = cityData
  initData(cityData.value)
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
