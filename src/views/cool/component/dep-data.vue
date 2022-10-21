<template>
  <div class="big-screen-box">
    <CoolTitle :title="`镇街部门数据(${cityInfo.name})`"></CoolTitle>
    <div class="cool-table">
      <el-table size="small" :data="departmentList" header-row-class-name="cool-header-row-class-name"
        row-class-name="cool-row-class-name" height="100%" :row-style="{backgroundColor: '#09192b'}">
        <el-table-column prop="index" label="序号" width="80">
          <template #default="scope">
            <span class="table-index">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="departName" label="镇街部门数据" width="180">
        </el-table-column>
        <el-table-column prop="number" label="受理量">
        </el-table-column>
        <el-table-column prop="percent" label="满意率" :formatter="formatter">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup>
import CoolTitle from '@/components/cool-title.vue'

const props = defineProps({
  departmentList: {
    type: Array,
    default: []
  },
  cityInfo: {
    type: Object,
    default: {
      name: '全市',
      value: 0
    }
  },
  cityInfo: {
    type: Object,
    default: {
      name: '全市',
      value: 0
    }
  }
})

const formatter = (row, column) => {
  return `${row.percent}%`
}

</script>
<style lang="scss">
.big-screen-box {
  height: 100%;


  .cool-table {
    margin-top: 8px;
    height: 85%;
  }

  .cool-header-row-class-name {
    color: #159aff;

    th.el-table__cell {
      background-color: #023164;
    }
  }

  .cool-row-class-name {
    background-color: #09192b;
    color: #ffffff;

    td.el-table__cell {
      border-bottom: none;
    }
  }

 
  .el-table--border::after,
  .el-table--border::before,
  .el-table--border .el-table__inner-wrapper::after,
  .el-table__inner-wrapper::before {
    background-color: #09192b;
  }

  .el-table {
    --el-table-border-color: #09192b;
    background-color: #09192b;
  }

  .table-index {
    color: #ff7734;
    display: block;
    width: 24px;
    height: 18px;
    background: rgba(255, 119, 52, 0.1);
    opacity: 1;
    border: 1px solid #ff7734;
    line-height: 14px;
    text-align: center;
  }

  /* 表格鼠标悬浮时的样式（高亮） */
  .el-table--enable-row-hover .el-table__body tr:hover {
    background: rgb(184, 224, 250);
    border: 1px solid #313463;
  }

  /*表格鼠标悬停的样式（背景颜色）*/
  .el-table tbody tr:hover>td {
    background-color: #1B7EF2 !important;
  }
}
</style>
