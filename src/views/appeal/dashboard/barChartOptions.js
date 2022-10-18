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
    ]
  }

  return barChartOptions
}
