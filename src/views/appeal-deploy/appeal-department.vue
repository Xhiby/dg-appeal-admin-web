<!-- 诉求部门 -->
<template>
  <div class="tab_pane">
    <div class="tab_pane_header">
      <el-form
        ref="FormRef"
        class="my-el-form-item-flex"
        size="default"
        :inline="true"
        :model="conditionForm">
        <el-row :gutter="8">
          <el-col :span="8">
            <el-form-item prop="keyword">
              <el-input
                v-model="conditionForm.keyword"
                placeholder="请输入类型名称搜索">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button @click="onReset"> 重置 </el-button>
              <el-button
                type="primary"
                @click="onSearch">
                查询
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <hr />
      <el-button
        class="tw-mt-[20px]"
        type="primary"
        size="default"
        @click="onAdd">
        新增
      </el-button>
    </div>
    <div class="tab_pane_content">
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        stripe
        row-class-name="my-el-table-stripe-row-name"
        header-cell-class-name="my-el-table-header-cell-name"
        style="width: 100%">
        <el-table-column
          width="74px"
          :index="indexMethod"
          type="index"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="departmentName"
          label="街镇/部门名称">
        </el-table-column>
        <el-table-column
          width="400px"
          prop="serviceCommissioner"
          label="服务专员">
        </el-table-column>
        <el-table-column
          prop="operate"
          width="180px"
          label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              text
              @click="onEdit(scope.row)">
              编辑
            </el-button>
            <el-button
              type="danger"
              text
              @click="onDelete">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tab_pane_footer">
      <el-pagination
        v-model:currentPage="pagination.pageNum"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :page-sizes="[10, 20, 40, 60]"
        small
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onSearch"
        @current-change="getEvaluateList">
      </el-pagination>
    </div>
  </div>

  <appealDepartmentDialog
    v-model:dialog-info="dialogStatus"
    @show="switchDialog(isShow)">
  </appealDepartmentDialog>
</template>

<script setup>
  import { onMounted, reactive, ref } from 'vue'
  import { usePagination } from '@/utils/hooks'
  import { useMockTableData } from '@/utils/hooks'

  // 引入弹窗组件
  import appealDepartmentDialog from './components/appeal-department/appeal-department-dialog.vue'

  // 弹窗相关
  const dialogStatus = reactive({
    // 是否显示
    show: false,

    // 选择编辑的街镇部门
    depName: '',

    // 可被分配的服务专员
    service: []
  })

  const loading = ref(false)
  // 分页对象
  const { pagination, indexMethod } = usePagination()

  // 搜索条件
  const conditionForm = reactive({
    keyword: ''
  })
  const FormRef = ref(null)
  // 表格数据
  const tableData = ref([])
  onMounted(() => {
    tableData.value = useMockTableData(
      {
        departmentName: '书香门第',
        serviceCommissioner: '赵师傅'
      },
      25
    )
  })
  // 搜索
  const onSearch = () => {
    pagination.pageNum = 1
    //请求接口
  }
  //请求列表数据
  const getEvaluateList = () => {}
  // 重置
  const onReset = () => {
    FormRef.value.resetFields()
    onSearch()
  }

  // 可被分配的服务专员列表
  let serviceList = reactive([
    {
      label: '专员1',
      value: '专员1'
    },
    {
      label: '专员2',
      value: '专员2'
    },
    {
      label: '专员3',
      value: '专员3'
    }
  ])

  // 点击新增
  const onAdd = () => {}

  // 点击编辑
  const onEdit = (row) => {
    // 点击编辑的部门名称
    dialogStatus.depName = row.departmentName

    // 点击编辑的服务专员
    dialogStatus.service = serviceList
    dialogStatus.service.unshift({
      label: row.serviceCommissioner,
      value: row.serviceCommissioner
    })

    switchDialog(true)
  }

  //切换dialog
  const switchDialog = (isShow) => {
    dialogStatus.show = isShow
  }

  // 点击删除
  const onDelete = () => {}
</script>

<style lang="scss" scoped>
  .tab_pane {
    height: 100%;
    .tab_pane_header {
      margin-bottom: 20px;
    }
    .tab_pane_footer {
      width: 100%;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
</style>
