export default function getOptions(
  dataPie = [
    { value: 1048, name: '税务问题' },
    { value: 735, name: '土地要素' },
    { value: 580, name: '物流运输' },
    { value: 484, name: '经营性问题' },
    { value: 300, name: '法律问题' },
    { value: 900, name: '其他' }
  ]
) {
  const data = []
  dataPie.map((item, index) => {
    data[index] = {}
    data[index].value = item.percent
    data[index].name = item.departName
  })
  const pieChartOptions = {
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      top: '5%',
      right: '5%'
    },
    grid: {
      containLabel: false
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        center: ['30%', '50%'],
        radius: ['50%', '80%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            color: '#7985FD',
            formatter: function (params) {
              console.log(params)
              return `{a|${params.data.name}} \n {b|${params.percent}%} \n {c|${params.data.value}.00}`
            },
            rich: {
              s: {
                fontSize: '14'
              },
              b: {
                fontSize: '32',
                fontWeight: 'bold'
              },
              c: {
                fontSize: '14'
              }
            }
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  }

  return pieChartOptions
}
