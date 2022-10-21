<template>
  <table
    width="732"
    border="0"
    cellpadding="0"
    cellspacing="0"
    style="width: 549pt; border-collapse: collapse; table-layout: fixed; border-right: 1px solid #000000">
    <col
      width="72"
      style="width: 54pt" />
    <col
      width="321"
      style="mso-width-source: userset; mso-width-alt: 10272" />
    <col
      width="87"
      style="mso-width-source: userset; mso-width-alt: 2784" />
    <col
      width="252"
      style="mso-width-source: userset; mso-width-alt: 8064" />
    <tr
      height="36"
      style="height: 27pt; mso-height-source: userset; mso-height-alt: 540">
      <td
        class="xl65"
        height="36"
        width="732"
        colspan="4"
        style="height: 27pt; width: 549pt; border-right: 0.5pt solid windowtext; border-bottom: 0.5pt solid windowtext"
        x:str>
        非公重点企业问题申请事项呈批表
      </td>
    </tr>
    <tr
      height="36"
      style="height: 27pt; mso-height-source: userset; mso-height-alt: 540">
      <td
        class="xl66"
        height="36"
        style="height: 27pt"
        x:str>
        企业名称
      </td>
      <td
        class="xl68"
        colspan="3"
        style="border-right: 0.5pt solid windowtext; border-bottom: 0.5pt solid windowtext">
        {{ formData.organizationName }}
      </td>
    </tr>
    <tr
      height="36"
      style="height: 27pt; mso-height-source: userset; mso-height-alt: 540">
      <td
        class="xl66"
        height="36"
        style="height: 27pt"
        x:str>
        事项
      </td>
      <td
        class="xl68"
        colspan="3"
        style="border-right: 0.5pt solid windowtext; border-bottom: 0.5pt solid windowtext">
        {{ formData.appealTheme }}
      </td>
    </tr>
    <tr
      height="36"
      style="height: 27pt; mso-height-source: userset; mso-height-alt: 540">
      <td
        class="xl66"
        height="36"
        style="height: 27pt"
        x:str>
        分类
      </td>
      <td
        class="xl68"
        colspan="3"
        style="border-right: 0.5pt solid windowtext; border-bottom: 0.5pt solid windowtext">
        {{ formData.appealCategoryName }}
      </td>
    </tr>
    <tr
      height="116"
      style="height: 87pt; mso-height-source: userset; mso-height-alt: 1740">
      <td
        class="xl66"
        height="116"
        style="height: 87pt"
        x:str>
        事项概述
      </td>
      <td
        class="xl69"
        colspan="3"
        style="border-right: 0.5pt solid windowtext; border-bottom: 0.5pt solid windowtext">
        {{ formData.appealContent }}
      </td>
    </tr>
    <tr
      height="114.67"
      style="height: 86pt; mso-height-source: userset; mso-height-alt: 1720">
      <td
        class="xl66"
        height="114.67"
        style="height: 86pt"
        x:str>
        拟办意见
      </td>
      <td
        class="xl68"
        colspan="3"
        style="border-right: 0.5pt solid windowtext; border-bottom: 0.5pt solid windowtext">
      </td>
    </tr>
    <tr
      height="117.33"
      style="height: 88pt; mso-height-source: userset; mso-height-alt: 1760">
      <td
        class="xl66"
        height="117.33"
        style="height: 88pt"
        x:str>
        领导批示
      </td>
      <td
        class="xl68"
        colspan="3"
        style="border-right: 0.5pt solid windowtext; border-bottom: 0.5pt solid windowtext">
      </td>
    </tr>
    <tr
      height="36"
      style="height: 27pt; mso-height-source: userset; mso-height-alt: 540">
      <td
        class="xl72"
        height="36"
        colspan="4"
        style="height: 27pt; padding-left: 10px; border-right: 0.5pt solid windowtext; border-bottom: 0.5pt solid windowtext"
        x:str>
        经办人： <span style="mso-spacerun: yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>联系电话：
        <span style="mso-spacerun: yes"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
        打印日期：{{ formData.printDate }}
      </td>
    </tr>
    <div class="footer">
      <div class="title">处理流程</div>
      <div class="info">
        <div
          v-for="(item, index) in formData.handleList"
          :key="index"
          class="list">
          <div class="left">{{ `${index + 1}-${item.orgName}-${item.name} 电话：${item.phone}` }}</div>
          <div class="right">
            <p>
              回复内容: <span>{{ item.handleContent }}</span>
            </p>
            <p><span style="font-size: 16px; font-weight: 500">提出日期:</span>{{ item.handleTime }}</p>
          </div>
        </div>
      </div>
    </div>
    <tr
      width="0"
      style="display: none">
      <td
        width="321"
        style="width: 241">
      </td>
      <td
        width="87"
        style="width: 65">
      </td>
      <td
        width="252"
        style="width: 189">
      </td>
    </tr>
  </table>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import * as apis from '@/apis/index'
  import { useRoute } from 'vue-router'
  import { ElMessage } from 'element-plus'
  const route = useRoute()
  onMounted(() => {
    apis
      .exportDetailTable({
        id: route.query.sid
      })
      .then((res) => {
        if (res.data.code === 0) {
          formData.value = res.data.data
        } else {
          ElMessage.error('数据获取失败')
        }
        setTimeout(() => {
          window.print()
        }, 0)
      })
      .catch((err) => console.log(err))
  })

  const formData = ref({})
</script>

<style lang="scss" scoped>
  .footer {
    margin-left: -1px;
    display: flex;
    width: 733px;
    margin-top: 0.5px;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #000000;
      border-bottom: 1px solid #000000;
      border-left: 1px solid #000000;
      font-size: 11pt;
      font-weight: 500;
      width: 83px;
    }
    .info {
      width: 100%;

      .list {
        display: flex;
        width: 100%;
        height: 46px;
        .left {
          display: flex;
          width: 50%;
          height: 100%;
          border-right: 1px solid #000000;
          border-bottom: 1px solid #000000;
          text-align: center;
          justify-content: center;
          align-items: center;
          font-size: 0.5vw;
        }
        .right {
          width: 50%;
          height: 100%;
          border-bottom: 1px solid #000000;
          overflow: hidden;
          padding-left: 5px;
        }
      }
    }
  }

  tr {
    mso-height-source: auto;
    mso-ruby-visibility: none;
  }
  col {
    mso-width-source: auto;
    mso-ruby-visibility: none;
  }
  br {
    mso-data-placement: same-cell;
  }
  .font0 {
    color: #000000;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: '宋体';
    mso-generic-font-family: auto;
    mso-font-charset: 134;
  }
  .font2 {
    color: #000000;
    font-size: 11pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    font-family: '宋体';
    mso-generic-font-family: auto;
    mso-font-charset: 134;
  }
  .style0 {
    mso-number-format: 'General';
    text-align: general;
    vertical-align: middle;
    white-space: nowrap;
    mso-rotate: 0;
    mso-pattern: auto;
    mso-background-source: auto;
    color: #000000;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 134;
    border: none;
    mso-protection: locked visible;
    mso-style-name: '常规';
    mso-style-id: 0;
  }
  .style16 {
    mso-number-format: '_ \0022\00A5\0022* \#\,\#\#0_ \;_ \0022\00A5\0022* \\-\#\,\#\#0_ \;_ \0022\00A5\0022* \0022-\0022_ \;_ \@_ ';
    mso-style-name: '货币[0]';
    mso-style-id: 7;
  }
  .style17 {
    mso-pattern: auto none;
    background: #ebf1de;
    color: #000000;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '20% - 强调文字颜色 3';
  }
  .style18 {
    mso-pattern: auto none;
    background: #ffcc99;
    color: #3f3f76;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    border: 0.5pt solid #7f7f7f;
    mso-style-name: '输入';
  }
  .style19 {
    mso-number-format: '_ \0022\00A5\0022* \#\,\#\#0\.00_ \;_ \0022\00A5\0022* \\-\#\,\#\#0\.00_ \;_ \0022\00A5\0022* \0022-\0022??_ \;_ \@_ ';
    mso-style-name: '货币';
    mso-style-id: 4;
  }
  .style20 {
    mso-number-format: '_ * \#\,\#\#0_ \;_ * \\-\#\,\#\#0_ \;_ * \0022-\0022_ \;_ \@_ ';
    mso-style-name: '千位分隔[0]';
    mso-style-id: 6;
  }
  .style21 {
    mso-pattern: auto none;
    background: #d8e4bc;
    color: #000000;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '40% - 强调文字颜色 3';
  }
  .style22 {
    mso-pattern: auto none;
    background: #ffc7ce;
    color: #9c0006;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '差';
  }
  .style23 {
    mso-number-format: '_ * \#\,\#\#0\.00_ \;_ * \\-\#\,\#\#0\.00_ \;_ * \0022-\0022??_ \;_ \@_ ';
    mso-style-name: '千位分隔';
    mso-style-id: 3;
  }
  .style24 {
    mso-pattern: auto none;
    background: #c4d79b;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '60% - 强调文字颜色 3';
  }
  .style25 {
    color: #0000ff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: underline;
    text-underline-style: single;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '超链接';
    mso-style-id: 8;
  }
  .style26 {
    mso-number-format: '0%';
    mso-style-name: '百分比';
    mso-style-id: 5;
  }
  .style27 {
    color: #800080;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: underline;
    text-underline-style: single;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '已访问的超链接';
    mso-style-id: 9;
  }
  .style28 {
    mso-pattern: auto none;
    background: #ffffcc;
    border: 0.5pt solid #b2b2b2;
    mso-style-name: '注释';
  }
  .style29 {
    mso-pattern: auto none;
    background: #da9694;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '60% - 强调文字颜色 2';
  }
  .style30 {
    color: #1f497d;
    font-size: 11pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 134;
    mso-style-name: '标题 4';
  }
  .style31 {
    color: #ff0000;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '警告文本';
  }
  .style32 {
    color: #1f497d;
    font-size: 18pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 134;
    mso-style-name: '标题';
  }
  .style33 {
    color: #7f7f7f;
    font-size: 11pt;
    font-weight: 400;
    font-style: italic;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '解释性文本';
  }
  .style34 {
    color: #1f497d;
    font-size: 15pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 134;
    border-left: none;
    border-top: none;
    border-right: none;
    border-bottom: 1pt solid #4f81bd;
    mso-style-name: '标题 1';
  }
  .style35 {
    color: #1f497d;
    font-size: 13pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 134;
    border-left: none;
    border-top: none;
    border-right: none;
    border-bottom: 1pt solid #4f81bd;
    mso-style-name: '标题 2';
  }
  .style36 {
    mso-pattern: auto none;
    background: #95b3d7;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '60% - 强调文字颜色 1';
  }
  .style37 {
    color: #1f497d;
    font-size: 11pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 134;
    border-left: none;
    border-top: none;
    border-right: none;
    border-bottom: 1pt solid #a7bfde;
    mso-style-name: '标题 3';
  }
  .style38 {
    mso-pattern: auto none;
    background: #b1a0c7;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '60% - 强调文字颜色 4';
  }
  .style39 {
    mso-pattern: auto none;
    background: #f2f2f2;
    color: #3f3f3f;
    font-size: 11pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    border: 0.5pt solid #3f3f3f;
    mso-style-name: '输出';
  }
  .style40 {
    mso-pattern: auto none;
    background: #f2f2f2;
    color: #fa7d00;
    font-size: 11pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    border: 0.5pt solid #7f7f7f;
    mso-style-name: '计算';
  }
  .style41 {
    mso-pattern: auto none;
    background: #a5a5a5;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    border: 2pt double #3f3f3f;
    mso-style-name: '检查单元格';
  }
  .style42 {
    mso-pattern: auto none;
    background: #fde9d9;
    color: #000000;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '20% - 强调文字颜色 6';
  }
  .style43 {
    mso-pattern: auto none;
    background: #c0504d;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '强调文字颜色 2';
  }
  .style44 {
    color: #fa7d00;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    border-left: none;
    border-top: none;
    border-right: none;
    border-bottom: 2pt double #ff8001;
    mso-style-name: '链接单元格';
  }
  .style45 {
    color: #000000;
    font-size: 11pt;
    font-weight: 700;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    border-left: none;
    border-top: 0.5pt solid #4f81bd;
    border-right: none;
    border-bottom: 2pt double #4f81bd;
    mso-style-name: '汇总';
  }
  .style46 {
    mso-pattern: auto none;
    background: #c6efce;
    color: #006100;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '好';
  }
  .style47 {
    mso-pattern: auto none;
    background: #ffeb9c;
    color: #9c6500;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '适中';
  }
  .style48 {
    mso-pattern: auto none;
    background: #daeef3;
    color: #000000;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '20% - 强调文字颜色 5';
  }
  .style49 {
    mso-pattern: auto none;
    background: #4f81bd;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '强调文字颜色 1';
  }
  .style50 {
    mso-pattern: auto none;
    background: #dce6f1;
    color: #000000;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '20% - 强调文字颜色 1';
  }
  .style51 {
    mso-pattern: auto none;
    background: #b8cce4;
    color: #000000;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '40% - 强调文字颜色 1';
  }
  .style52 {
    mso-pattern: auto none;
    background: #f2dcdb;
    color: #000000;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '20% - 强调文字颜色 2';
  }
  .style53 {
    mso-pattern: auto none;
    background: #e6b8b7;
    color: #000000;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '40% - 强调文字颜色 2';
  }
  .style54 {
    mso-pattern: auto none;
    background: #9bbb59;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '强调文字颜色 3';
  }
  .style55 {
    mso-pattern: auto none;
    background: #8064a2;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '强调文字颜色 4';
  }
  .style56 {
    mso-pattern: auto none;
    background: #e4dfec;
    color: #000000;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '20% - 强调文字颜色 4';
  }
  .style57 {
    mso-pattern: auto none;
    background: #ccc0da;
    color: #000000;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '40% - 强调文字颜色 4';
  }
  .style58 {
    mso-pattern: auto none;
    background: #4bacc6;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '强调文字颜色 5';
  }
  .style59 {
    mso-pattern: auto none;
    background: #b7dee8;
    color: #000000;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '40% - 强调文字颜色 5';
  }
  .style60 {
    mso-pattern: auto none;
    background: #92cddc;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '60% - 强调文字颜色 5';
  }
  .style61 {
    mso-pattern: auto none;
    background: #f79646;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '强调文字颜色 6';
  }
  .style62 {
    mso-pattern: auto none;
    background: #fcd5b4;
    color: #000000;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '40% - 强调文字颜色 6';
  }
  .style63 {
    mso-pattern: auto none;
    background: #fabf8f;
    color: #ffffff;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 0;
    mso-style-name: '60% - 强调文字颜色 6';
  }
  td {
    mso-style-parent: style0;
    padding-top: 1px;
    padding-right: 1px;
    padding-left: 1px;
    mso-ignore: padding;
    mso-number-format: 'General';
    text-align: general;
    vertical-align: middle;
    white-space: nowrap;
    mso-rotate: 0;
    mso-pattern: auto;
    mso-background-source: auto;
    color: #000000;
    font-size: 11pt;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 宋体;
    mso-generic-font-family: auto;
    mso-font-charset: 134;
    border: none;
    mso-protection: locked visible;
  }
  .xl65 {
    mso-style-parent: style0;
    text-align: center;
    font-size: 14pt;
    font-weight: 700;
    mso-font-charset: 134;
    border: 0.5pt solid windowtext;
  }
  .xl66 {
    mso-style-parent: style0;
    font-weight: 700;
    mso-font-charset: 134;
    border: 0.5pt solid windowtext;
  }
  .xl67 {
    mso-style-parent: style0;
    mso-font-charset: 134;
    border: 0.5pt solid windowtext;
  }
  .xl68 {
    mso-style-parent: style0;
    text-align: center;
    mso-font-charset: 134;
    border: 0.5pt solid windowtext;
  }
  .xl69 {
    mso-style-parent: style0;
    text-align: center;
    mso-font-charset: 134;
    border-left: 0.5pt solid windowtext;
    border-top: 0.5pt solid windowtext;
    border-bottom: 0.5pt solid windowtext;
  }
  .xl72 {
    mso-style-parent: style0;
    text-align: left;
    font-weight: 700;
    mso-font-charset: 134;
    border-left: 0.5pt solid windowtext;
    border-top: 0.5pt solid windowtext;
    border-bottom: 0.5pt solid windowtext;
  }
  .xl75 {
    mso-style-parent: style0;
    text-align: center;
    font-weight: 700;
    mso-font-charset: 134;
    border: 0.5pt solid windowtext;
  }
  .xl76 {
    mso-style-parent: style0;
    text-align: left;
    white-space: normal;
    mso-font-charset: 134;
    border: 0.5pt solid windowtext;
  }
</style>
