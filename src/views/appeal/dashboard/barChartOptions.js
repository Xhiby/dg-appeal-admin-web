export default function getOptions() {
  const barChartOptions = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
        data: [42, 32, 55, 80, 70, 38, 76],
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
