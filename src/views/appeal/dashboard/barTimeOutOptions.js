export default function getTimeOutOptions(dataX = [], dataY = []) {
  // ['标题', '接单超时', '办理超时']
  const dataFormate = [['标题', '接单超时', '办理超时']]
  for (let index = 0; index < dataX.length; index++) {
    const arr = []
    arr.push(dataX[index], dataY[index].receiveOuttime, dataY[index].receiveOuttime)
    dataFormate.push(arr)
  }

  return {
    legend: {
      right: 10
    },
    tooltip: {},
    dataset: {
      source: dataFormate
    },
    xAxis: { type: 'category' },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
      {
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          borderRadius: 40
        },
        barMaxWidth: 15,
        itemStyle: {
          borderRadius: 50
        }
      },
      {
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          borderRadius: 50
        },
        barMaxWidth: 15,
        itemStyle: {
          borderRadius: 50
        }
      }
    ]
  }
}
