<template>
  <div ref="chartsDom" :style="{ height: '100%', width: '100%' }">
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import china from '@/assets/json/dongguannew.json'
import { ref, onMounted } from 'vue'
const chartsDom = ref(null)
onMounted(() => {
  initCharts(chartsDom.value)
})

const initCharts = (chartsDom) => {
  const charts = echarts.init(chartsDom)

  const option = {
    // 背景颜色
    // backgroundColor: '#fff',
    // 提示浮窗样式
    tooltip: {
      show: true,
      trigger: 'item', //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      alwaysShowContent: false,
      backgroundColor: '#fff',
      borderColor: 'rgba(0, 0, 0, 0.16);',
      triggerOn: 'mousemove',
      enterable: true, //鼠标是否可进入提示框浮层中
      textStyle: {
        fontSize: '12',
        overflow: 'break'
      },
      formatter: function (params) {
        // let str = ''
        // str = `<div> ` + params.name + `:` + params.value + `</div>`
        return `<div> ${params.name} </div>`
      }
    },
    // 地图配置
    geo: {
      map: 'dongguan',
      aspectScale: 0.8, //长宽比,0.75的含义为宽是高的0.75,假如高为100,宽就只有75;0.5的含义就是宽只有高的一半,假如高为100,宽就只有50
      zoom: 1.2, //视觉比例大小,1.2即为原有大小的1.2倍
      roam: false, //是否开启鼠标缩放和平移漫游。默认不开启。可以不用设置,如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。
      top: '20%',
      label: {
        // 通常状态下的样式
        normal: {
          show: true,
          textStyle: {
            color: '#fff'
          }
        },
        // 鼠标放上去的样式
        emphasis: {
          textStyle: {
            color: '#fff'
          }
        }
      },
      // 地图区域的样式设置
      itemStyle: {
        normal: {
          borderColor: 'rgba(147, 235, 248, 1)',
          borderWidth: 1,
          areaColor: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
                offset: 0,
                color: '#4a9de4' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#4a9de4' // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          },
          shadowColor: '#83c4f3',
          shadowOffsetX: -2,
          shadowOffsetY: 2,
          shadowBlur: 10
        },
        // 鼠标放上去高亮的样式
        emphasis: {
          // areaColor: "rgba(0, 0, 0, 0.1)",
          borderWidth: 0
        }
      }
    },
    series: [
      {
        selectedMode: false, //取消地图区域点击事件
        geoIndex: 0, //将数据和第0个geo配置关联在一起
        type: 'map',
        data: [
          { name: '常平', value: 26 },
          { name: '清溪', value: 25 },
          { name: '长安', value: 16 },
          { name: '东坑', value: 29 },
          { name: '寮步', value: 17 },
          { name: '厚街', value: 14 },
          { name: '塘厦', value: 23 },
          { name: '道滘', value: 13 },
          { name: '石碣', value: 10 },
          { name: '洪梅', value: 12 },
          { name: '茶山', value: 32 },
          { name: '谢岗', value: 24 },
          { name: '大岭山', value: 18 },
          { name: '沙田', value: 15 },
          { name: '东城', value: 4 },
          { name: '高埗', value: 11 },
          { name: '麻涌', value: 9 },
          { name: '企石', value: 30 },
          { name: '石排', value: 31 },
          { name: '横沥', value: 28 },
          { name: '望牛墩', value: 8 },
          { name: '大朗', value: 19 },
          { name: '凤岗', value: 22 },
          { name: '万江', value: 5 },
          { name: '中堂', value: 7 },
          { name: '樟木头', value: 21 },
          { name: '南城', value: 6 },
          { name: '石龙', value: 2 },
          { name: '虎门', value: 3 },
          { name: '桥头', value: 27 },
          { name: '黄江', value: 20 },
          { name: '莞城', value: 1 },
          { name: '松山湖', value: 33 }
        ],
      }
    ]
  }
  // 地图注册，第一个参数的名字必须和option.geo.map一致

  echarts.registerMap('dongguan', china)
  charts.setOption(option)
  charts.on('click', function (e) {
    console.log(e, e.event.target, 'e====')
    //取消鼠标移入地图区域高亮
    // charts.dispatchAction({
    //   type: 'legendUnSelect'
    // })
  })
}
</script>

<style lang="scss" scoped>

</style>
