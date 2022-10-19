<template>
  <div class="big-screen-box">
    <CoolTitle title="镇街部门数据(虎门)"></CoolTitle>
    <el-table
      size="small"
      :data="tableData"
      header-row-class-name="cool-header-row-class-name"
      row-class-name="cool-row-class-name"
      class="cool-table">
      <el-table-column
        prop="index"
        label="序号"
        width="80">
        <template #default="scope">
          <span class="table-index">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="镇街部门数据（虎门）"
        width="180">
      </el-table-column>
      <el-table-column
        prop="num"
        label="受理量">
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
  import CoolTitle from '@/components/cool-title.vue'
  const tableData = [
    {
      date: '2016-05-03',
      name: 'Tom',
      num: '32'
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      num: '189'
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      num: '150'
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      num: '122'
    }
  ]
</script>
<style lang="scss">
  .big-screen-box {
    .cool-table {
      margin-top: 8px;
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
    // .cool-row-class-name :hover {
    //   background-color: #09192b;
    // }
    .el-table--border::after,
    .el-table--border::before,
    .el-table--border .el-table__inner-wrapper::after,
    .el-table__inner-wrapper::before {
      background-color: #09192b;
    }
    .el-table {
      --el-table-border-color: #09192b;
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
  }
</style>
