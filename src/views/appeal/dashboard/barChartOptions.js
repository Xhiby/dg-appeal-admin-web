export default function getOptions(dataX = [], dataFormate = []) {
  const barChartOptions = {
    xAxis: {
      type: 'category',
      data: dataX
    },
    yAxis: {
      type: 'value',
      name: '(%)',
      min: 0,
      max: 100
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        data: dataFormate,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
          borderRadius: 30
        },
        itemStyle: {
          color: '#387FFA',
          width: 5,
          borderRadius: 30
        },
        barMaxWidth: 15
      }
    ],
    dataZoom: [
      {
        type: 'slider', //隐藏或显示（true）组件
        show: true,
        backgroundColor: 'rgb(19, 63, 100)', // 组件的背景颜色。
        fillerColor: 'rgb(16, 171, 198)', // 选中范围的填充颜色。
        borderColor: 'rgb(19, 63, 100)', // 边框颜色
        showDetail: false, //是否显示detail，即拖拽时候显示详细数值信息
        startValue: 0,
        endValue: 5,
        filterMode: 'empty',
        width: '50%', //滚动条高度
        height: 8, //滚动条显示位置
        left: 'center',
        zoomLoxk: true, // 是否锁定选择区域（或叫做数据窗口）的大小
        handleSize: 0, //控制手柄的尺寸
        bottom: 3 // dataZoom-slider组件离容器下侧的距离
      },
      {
        //没有下面这块的话，只能拖动滚动条，鼠标滚轮在区域内不能控制外部滚动条
        type: 'inside',
        zoomOnMouseWheel: false, //滚轮是否触发缩放
        moveOnMouseMove: true, //鼠标滚轮触发滚动
        moveOnMouseWheel: true
      }
    ]
  }

  return barChartOptions
}
