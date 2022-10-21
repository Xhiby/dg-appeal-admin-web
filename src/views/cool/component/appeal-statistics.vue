<template>
  <div class="box">
    <CoolTitle :title="`诉求统计(${cityInfo.name})`"></CoolTitle>
    <div class="chart-box">
      <div class="chart">
        <v-chart :option="options">
        </v-chart>
      </div>
      <dl class="total">
        <dt>诉求总量</dt>
        <dd>{{statisticsBase.allAppealNum}}</dd>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, defineComponent,computed } from 'vue'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

const props = defineProps({
  statisticsBase: {
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

const option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    bottom: 'bottom',
    left: 'left',
    data: ['已处理', '待处理'],
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
        show: true
      },
      data: [
        { value: props.statisticsBase.processed, name: '已处理' },
        { value:  props.statisticsBase.pending, name: '待处理' }
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
  option.series[0].data[0].value = props.statisticsBase.processed
  option.series[0].data[1].value = props.statisticsBase.pending
  return { ...option }
})
</script>

<style lang="scss" scoped>
.box {
  height: 100%;
}

.chart-box {
  height: 90%;
  display: flex;

  .chart {
    width: 85%;
  }

  .total {
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
