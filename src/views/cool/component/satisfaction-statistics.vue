<template>
  <div class="box">
    <CoolTitle title="满意度统计（虎门）"></CoolTitle>
    <div class="chart-box">
      <div class="chart">
        <v-chart :option="options">
        </v-chart>
      </div>
      <ul class="percentage">
        <li>非常满意 {{percentageBase.veryPleased}}%</li>
        <li>满意 {{percentageBase.pleased}}%</li>
        <li>不满意 {{percentageBase.notPleased}}%</li>
      </ul>
    </div>

  </div>
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, defineComponent, computed } from 'vue'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

const props = defineProps({
  percentageBase: {
    type: Object,
    default: {}
  }
})

const option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    bottom: 'bottom',
    left: 'left',
    data: ['非常满意', '满意', '不满意'],
    textStyle: {
      color: '#fff'
    }
  },
  series: [
    {
      // name: 'Traffic Sources',
      type: 'pie',
      radius: '65%',
      center: ['40%', '50%'],
      label: {
        show: false
      },
      data: [
        { value: props.percentageBase.veryPleased, name: '非常满意' },
        { value: props.percentageBase.pleased, name: '满意' },
        { value: props.percentageBase.notPleased, name: '不满意' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}

const options = computed(() => {
  option.series[0].data[0].value = props.percentageBase.veryPleased
  option.series[0].data[1].value = props.percentageBase.pleased
  option.series[0].data[2].value = props.percentageBase.notPleased
  return { ...option }
})
</script>

<style lang="scss" scoped>
.box {
  height: 100%;
}

.chart-box {
  height: 80%;
  display: flex;

  .chart {
    width: 85%;
  }

  .percentage {
    margin-top: 18%;
    color: #fff;
    line-height: 2.5rem;

    dd {
      color: #29F1FA;
      font-size: 2rem;
    }
  }
}
</style> 
