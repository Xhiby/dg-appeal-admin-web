<template>
  <div class="appeals">
    <cool-title :title="`重点诉求(${cityInfo.name})`"></cool-title>
    <div class="cards">
      <div class="card-box">
        <el-icon class="icon" color="#29F1FA">
          <Edit></Edit>
        </el-icon>
        <span class="desc">督办率</span>
        <span>{{percentBase?.supervisePercent}}%</span>
      </div>
      <div class="card-box">
        <el-icon class="icon" color="#29F1FA">
          <Edit></Edit>
        </el-icon>
        <span class="desc">好评率</span>
        <span>{{percentBase?.highOpinionPercent}}%</span>
      </div>
      <div class="card-box">
        <el-icon class="icon" color="#29F1FA">
          <Edit></Edit>
        </el-icon>
        <span class="desc">超时率</span>
        <span>{{percentBase?.outtimePercent}}%</span>
      </div>
      <div class="card-box">
        <el-icon class="icon" color="#29F1FA">
          <Edit></Edit>
        </el-icon>
        <span class="desc">倍增诉求</span>
        <span>{{percentBase?.multiplyDemand}}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import CoolTitle from '@/components/cool-title.vue'
const props = defineProps({
  percentBase: {
    type: Object,
    default: {}
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
.appeals {
  height: 100%;
}

.cards {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 78%;
  flex-wrap: wrap;
  padding: 3% 0;
}

.card-box {
  width: 45%;
  height: 40%;
  background: rgba(0, 211, 255, 0.11);
  border-radius: 6px 6px 6px 6px;
  padding: 10px;
  display: flex;
  color: #fff;
  justify-content: space-around;
  align-items: center;

  .icon {
    font-size: 2rem;
  }

  .desc {
    color: #159aff;
  }
}
</style>
