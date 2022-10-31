<template>
  <div class="page_main">
    <PageTitle
      title="诉求概览"
      class="tw-mb-[40px]">
    </PageTitle>
    <div class="content">
      <el-row :gutter="145">
        <el-col
          :sm="12"
          :xs="12"
          :md="12"
          :lg="6"
          :xl="6">
          <div class="item">
            <div
              class="top tw-bg-[#FFEBD0]"
              @click="skip('/appeal')">
              <img
                class="headerPhoto"
                src="@/assets/images/appeal-preview/iconlist0.png"
                alt="" />
              <p>诉求列表</p>
              <img
                class="footerPhoto"
                src="@/assets/images/appeal-preview/iconsmall0.png"
                alt="" />
            </div>
            <div class="footer">
              <div class="tittle">
                <p>领导关注</p>
              </div>
              <div
                class="number tw-text-[#409EFF]"
                @click="skip('/appeal-leader-manager', 'leader')">
                {{ formData.leaderAttentionCount }}
              </div>
            </div>
          </div>
        </el-col>
        <el-col
          :sm="12"
          :xs="12"
          :md="12"
          :lg="6"
          :xl="6">
          <div class="item">
            <div
              class="top tw-bg-[#D3ECFF]"
              @click="skip('/appeal/dashboard')">
              <img
                class="headerPhoto"
                src="@/assets/images/appeal-preview/iconlist1.png"
                alt="" />
              <p>诉求统计</p>
              <img
                class="footerPhoto"
                src="@/assets/images/appeal-preview/iconsmall1.png"
                alt="" />
            </div>
            <div class="footer">
              <div class="tittle">
                <p>推进中诉求</p>
              </div>
              <div
                class="number tw-text-[#E6A23C]"
                @click="skip('/appeal')">
                {{ formData.pushCount }}
              </div>
            </div>
          </div>
        </el-col>
        <el-col
          :sm="12"
          :xs="12"
          :md="12"
          :lg="6"
          :xl="6">
          <div class="item">
            <div
              class="top tw-bg-[#DFF8FF]"
              @click="skip('/log-manage')">
              <img
                class="headerPhoto"
                src="@/assets/images/appeal-preview/iconlist2.png"
                alt="" />
              <p>工作日志</p>
              <img
                class="footerPhoto"
                src="@/assets/images/appeal-preview/iconsmall2.png"
                alt="" />
            </div>
            <div class="footer">
              <div class="tittle">
                <p>超时诉求</p>
              </div>
              <div
                class="number tw-text-[#F56C6C]"
                @click="skip('/appeal')">
                {{ formData.thisMonthCreateCount }}
              </div>
            </div>
          </div>
        </el-col>
        <el-col
          :sm="12"
          :xs="12"
          :md="12"
          :lg="6"
          :xl="6">
          <div class="item">
            <div
              class="top tw-bg-[#CCDFFF]"
              @click="skip('/appeal-deploy')">
              <img
                class="headerPhoto"
                src="@/assets/images/appeal-preview/iconlist3.png"
                alt="" />
              <p>配置管理</p>
              <img
                class="footerPhoto"
                src="@/assets/images/appeal-preview/iconsmall3.png"
                alt="" />
            </div>
            <div class="footer">
              <div class="tittle">
                <p>本月新增诉求</p>
              </div>
              <div
                class="number tw-text-[#67C23A]"
                @click="skip('/appeal')">
                {{ formData.timeoutCount }}
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import PageTitle from '@/components/page-title.vue'
  import * as apis from '@/apis/index'
  import { ElMessage } from 'element-plus'
  import { onMounted } from 'vue'
  const router = useRouter()
  const skip = (src, command = 'nothing') => {
    if (command === 'leader') {
      const routerUrl = router.resolve(src)
      window.open(routerUrl.href, '_blank')
    } else {
      router.push(src)
    }
  }
  const formData = ref({})
  onMounted(() => {
    getAppealSurvey()
  })
  const getAppealSurvey = () => {
    apis
      .getAppealSurvey()
      .then((res) => {
        if (res.data.code === 0) {
          formData.value = res.data.data
        } else {
          ElMessage.error(res.data.msg)
        }
      })
      .catch((err) => console.log(err))
  }
</script>

<style lang="scss" scoped>
  .page_main {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 15px 20px;
    overflow: auto;

    .content {
      min-width: 1100px;
      width: 100%;
      padding: 80px 160px;

      .item {
        width: 100%;
        height: 540px;
        min-width: 320px;

        .top {
          position: relative;
          padding-top: 40px;
          padding-left: 63px;
          padding-right: 63px;
          width: 100%;
          height: 260px;
          cursor: pointer;

          .headerPhoto {
            margin: 0 auto;
          }
          p {
            margin-top: 30px;
            font-weight: 500;
            font-size: 24px;
            text-align: center;
          }
          .footerPhoto {
            position: absolute;
            left: 50%;
            transform: translate(-50%, 50%);
          }
        }

        .footer {
          width: 100%;
          height: 158px;
          margin-top: 93px;
          border: 1px solid #eaeaea;
          border-radius: 12px 12px 12px 12px;
          box-shadow: 0px 0px 41px 5px rgba(221, 221, 221, 0.36);
          .tittle {
            display: flex;
            width: 100%;
            height: 59px;
            text-align: center;
            border-bottom: 1px solid #eaeaea;
            align-items: center;
            justify-content: center;
            p {
              font-size: 20px;
              font-weight: bold;
            }
          }

          .number {
            cursor: pointer;
            display: flex;
            width: 100%;
            height: 97px;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            font-size: 56px;
          }
        }
      }
    }
  }
</style>
