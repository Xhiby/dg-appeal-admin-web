<template>
  <div class="box">
    <CoolTitle :title="`处理数量统计(${cityInfo.name})`"></CoolTitle>
    <v-chart class="chart" :option="options">
    </v-chart>
  </div>
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { ref, toRefs, computed } from 'vue'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

const props = defineProps({
  tableDataVo: {
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

const dataX = ref(props.tableDataVo.dataX)
const dataY = ref(props.tableDataVo.dataY)

const option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}'
  },
  xAxis: {
    type: 'category',
    splitLine: { show: false },
    data: dataX
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  yAxis: {
    type: 'log',
    // name: 'y',
    minorSplitLine: {
      show: true
    }
  },
  series: [
    {
      name: 'Log1/2',
      type: 'line',
      data: dataY,
      itemStyle: {
        normal: {
          color: '##FFD15C', //折线点的颜色
          borderColor: '#FFD15C', //拐点边框颜色
          borderWidth: 2 //拐点边框大小
        }
      },
      lineStyle: {
        color: ' ##FFD15C' //折线的颜色
      }
    }
  ]
}

const options = computed(() => {
  console.log(props.tableDataVo.dataX, props.tableDataVo, 'option,dataX===')
  option.xAxis.data = props.tableDataVo.dataX
  option.series[0].data = props.tableDataVo.dataY
  return { ...option }
})


</script>

<style lang="scss" scoped>
.box {
  height: 100%;
}
.chart {
  height: 60%;
}
</style>
