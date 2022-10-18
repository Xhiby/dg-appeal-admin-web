<template>
  <div class="page_main">
    <PageTitle
      title="诉求统计"
      class="tw-mb-[20px]">
    </PageTitle>
    <div class="tw-flex tw-mb-[12px]">
      <el-button
        type="primary"
        plain>
        2022/1
      </el-button>
      <el-button
        type="primary"
        plain>
        倍增计划
      </el-button>
      <el-button type="primary">导出</el-button>
    </div>
    <div class="dashboard_header tw-mb-[15px]">
      <el-row :gutter="18">
        <el-col
          v-for="(item, index) in topList"
          :key="index"
          :lg="4"
          :md="6"
          :sm="8"
          :xs="8">
          <div
            class="dashboard_header_item tw-my-[20px]"
            :style="{ backgroundImage: `url(${((index + 1) / 2) % 0 ? bg1 : bg2})` }">
            <p>{{ item.tittle }}</p>
            <span>{{ item.munber }}{{ index >= 3 ? '%' : '' }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <hr />
    <div class="dashboard_content tw-mt-[20px]">
      <el-row :gutter="20">
        <el-col
          :lg="6"
          :md="10"
          :sm="14"
          :xs="14">
          <div class="appealTypePro">
            <h1>诉求分类占比</h1>
            <div class="bar_chart_box">
              <v-chart
                class="tw-w-full tw-h-full"
                :option="pieOption"
                autoresize>
              </v-chart>
            </div>
          </div>
        </el-col>
        <el-col
          :lg="9"
          :md="14"
          :sm="16"
          :xs="16">
          <div class="solvePro">
            <h1>解决率统计（部门）</h1>
            <div class="bar_chart_box">
              <v-chart
                class="tw-w-full tw-h-full"
                :option="barOptionLeft">
              </v-chart>
            </div>
          </div>
        </el-col>
        <el-col
          :lg="9"
          :md="14"
          :sm="16"
          :xs="16">
          <div class="otherPro">
            <h1>解决率统计（部门）</h1>
            <div class="bar_chart_box">
              <v-chart
                class="tw-w-full tw-h-full"
                :option="barOptionRight">
              </v-chart>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="dashboard_footer">
      <el-row>
        <el-col>
          <div class="timeOutPro">
            <h1>超时统计</h1>
            <div class="bar_chart_box">
              <v-chart
                class="tw-w-full tw-h-full"
                :option="timeOutOptions">
              </v-chart>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
  import bg1 from '@/assets/images/appeal-dashboard/bg1.png'
  import bg2 from '@/assets/images/appeal-dashboard/bg2.png'

  import getPieOptions from './pieChartOptions'
  import getBarOption from './barChartOptions'
  import getTimeOutOptions from './barTimeOutOptions'
  import { topList } from '@/config/global-var'
  import { onMounted, reactive, ref } from 'vue'

  const pieOption = ref({})
  const barOptionLeft = ref({})
  const barOptionRight = ref({})
  const timeOutOptions = ref({})

  const mockbarOptionLeft = reactive({
    dataX: ['A', 'B', 'C', 'D', 'E'],
    dataFormate: [12, 35, 61, 21, 34]
  })

  const mockbarOptionRight = reactive({
    dataX: ['带', '带', '大', '师', '兄'],
    dataFormate: [60, 55, 34, 57, 98]
  })

  onMounted(() => {
    pieOption.value = getPieOptions()
    barOptionLeft.value = getBarOption(mockbarOptionLeft.dataX, mockbarOptionLeft.dataFormate)
    barOptionRight.value = getBarOption(mockbarOptionRight.dataX, mockbarOptionRight.dataFormate)
    timeOutOptions.value = getTimeOutOptions()
  })
</script>

<style lang="scss" scoped>
  .page_main {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 15px 20px;
    overflow: auto;

    .dashboard_header {
      &_item {
        height: 78px;
        padding: 7px 28px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        color: #ffffff;
        p {
          font-size: 14px;
          font-weight: 600px;
        }
        span {
          font-size: 30px;
          font-weight: bold;
        }
      }
    }

    .dashboard_content {
      // 诉求分类占比
      .appealTypePro {
        flex: 1;
        padding: 16px 20px;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #e6e6e6;
        margin-bottom: 10px;

        h1 {
          font-size: 16px;
          font-weight: 600;
          color: #303133;
          line-height: 22px;
          margin-bottom: 16px;
        }
        .bar_chart_box {
          min-width: 375px;
          width: 100%;
          height: 240px;
        }
      }
      .solvePro {
        flex: 1;
        padding: 16px 20px;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #e6e6e6;
        margin-bottom: 10px;

        h1 {
          font-size: 16px;
          font-weight: 600;
          color: #303133;
          line-height: 22px;
          margin-bottom: 16px;
        }
        .bar_chart_box {
          min-width: 450px;
          width: 100%;
          height: 240px;
        }
      }
      .otherPro {
        flex: 1;
        padding: 16px 20px;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #e6e6e6;
        margin-bottom: 10px;

        h1 {
          font-size: 16px;
          font-weight: 600;
          color: #303133;
          line-height: 22px;
          margin-bottom: 16px;
        }
        .bar_chart_box {
          min-width: 450px;
          width: 100%;
          height: 240px;
        }
      }
    }
    .dashboard_footer {
      .timeOutPro {
        flex: 1;
        padding: 16px 20px;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #e6e6e6;
        h1 {
          font-size: 16px;
          font-weight: 600;
          color: #303133;
          line-height: 22px;
          margin-bottom: 16px;
        }
        .bar_chart_box {
          min-width: 450px;
          width: 100%;
          height: 450px;
        }
      }
    }
  }
</style>
