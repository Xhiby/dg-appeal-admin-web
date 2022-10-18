export default function getTimeOutOptions(
  dataFormate = [
    // 二维数组中第一层数组代表了legend功能按钮
    ['product', '2015', '2016', '2017'],
    ['Matcha Latte', 43.3, 85.8, 93.7],
    ['Milk Tea', 83.1, 73.4, 55.1],
    ['Cheese Cocoa', 86.4, 65.2, 82.5],
    ['Walnut Brownie', 72.4, 53.9, 39.1],
    ['wuan', 72.4, 53.9, 39.1],
    ['sss', 72.4, 53.9, 39.1]
  ]
) {
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
