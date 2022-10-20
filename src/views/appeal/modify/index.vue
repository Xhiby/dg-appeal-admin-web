<template>
  <div
    v-loading="loading"
    class="page_main">
    <Breadcrumb
      class="tw-mb-[60px]"
      :list="[{ name: '诉求列表', path: '/appeal' }, { name: isEdit ? '编辑诉求' : '新增诉求' }]">
    </Breadcrumb>
    <el-form
      ref="serviceFormRef"
      class="tw-px-[10px]"
      size="large"
      label-position="left"
      label-width="180px"
      :model="serviceForm"
      :rules="formRules">
      <el-form-item
        prop="organizationName"
        label="企业">
        <el-autocomplete
          v-model="serviceForm.organization"
          :fetch-suggestions="fuzzySearchOrganByKeyword"
          placeholder="请输入企业名称"
          style="width: 326px"
          @select="handleOrganSelected">
        </el-autocomplete>
      </el-form-item>
      <el-form-item
        prop="appealTheme"
        label="主题">
        <el-input
          v-model="serviceForm.appealTheme"
          placeholder="请输入诉求主题"
          style="width: 326px">
        </el-input>
      </el-form-item>
      <el-form-item
        prop="appealChildCategoryCode"
        label="分类">
        <el-tree-select
          v-model="serviceForm.appealChildCategoryCode"
          :data="appealCategories"
          :render-after-expand="false"
          style="width: 326px"
          placeholder="请选择诉求分类"
          @node-click="(node, nodeProps) => handleNodeClick(nodeProps)">
        </el-tree-select>
      </el-form-item>
      <el-form-item
        prop="appealLabelCode"
        label="标签">
        <el-select
          v-model="serviceForm.appealLabelCode"
          style="width: 326px"
          placeholder="请选择领导标签">
          <el-option
            v-for="item in appealsLabels"
            :key="item.labelCode"
            :label="item.labelName"
            :value="item.labelCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="involveDepartment"
        label="预涉及部门">
        <div class="tw-w-[400px]">
          <el-check-tag
            v-for="dept in involveDepartment"
            :key="dept.name"
            :checked="dept.checked"
            class="tw-w-[88px] tw-mr-[10px] tw-text-center"
            @change="(status) => handleInvolveDepartmentChange(dept, status)">
            {{ dept.name }}
          </el-check-tag>
          <el-input
            v-model="serviceForm.otherInvolveDepartment"
            placeholder="其他部门"
            size="default"
            style="width: 188px">
          </el-input>
        </div>
      </el-form-item>
      <el-form-item
        prop="email"
        label="描述">
        <el-input
          v-model.trim="serviceForm.appealContent"
          type="textarea"
          :rows="4"
          show-word-limit
          maxlength="200"
          placeholder="每条诉求不能包括多条诉求内容，如涉及多个诉求，本诉求将被拆分!"
          style="width: 326px">
        </el-input>
      </el-form-item>
      <el-form-item
        prop="appealAccessory"
        label="相关附件">
        <el-upload
          v-model:file-list="serviceForm.appealAccessory"
          class="dg-appeal-uploader"
          :action="uploadUrl"
          multiple
          :limit="6"
          :before-upload="beforeImageUpload"
          :on-exceed="handleUploadExceed">
          <el-button type="primary">添加文件</el-button>
          <template #tip>
            <div class="el-upload__tip tw-text-[#F56C6C]"> 附件必须小于10MB. </div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
    <el-row class="tw-mt-[50px]">
      <el-button
        :loading="btnLoading"
        size="large"
        @click="onBack(router)">
        取消
      </el-button>
      <el-button
        :loading="btnLoading"
        type="primary"
        size="large"
        @click="handleSubmit">
        提交
      </el-button>
    </el-row>
  </div>
</template>

<script setup>
  import Breadcrumb from '@/components/breadcrumb/index.vue'
  import { computed, onMounted, reactive, ref, toRaw } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { onBack } from '@/utils/hooks'
  import { uploadUrl } from '@/apis/index.js'
  import { ElMessage } from 'element-plus'
  import { getAppealsLabels, applyAppeal, getAppealsOrgan, getAllAppealCategories } from '@/apis/appeal-crud'

  const involveDepartment = reactive(['工业', '国土', '商务', '科技', '自然资源', '金融', '环保', '人社', '市场监督', '自然资源'].map((dept) => ({ name: dept, checked: false })))
  const route = useRoute()
  const router = useRouter()
  const loading = ref(false)
  const btnLoading = ref(false)
  const serviceForm = reactive({
    otherInvolveDepartment: '',
    appealChildCategoryCode: '',
    appealContent: '',
    appealLabelCode: '',
    appealTheme: '',
    involveDepartment: [],
    organization: '',
    appealAccessory: []
  })
  const formRules = reactive({
    organization: [{ required: true, message: '请选择企业', trigger: 'blur' }],
    appealTheme: [{ required: true, message: '请输入诉求主题', trigger: 'blur' }],
    appealChildCategoryCode: [{ required: true, message: '请选择诉求分类', trigger: 'blur' }],
    appealContent: [{ required: true, message: '请输入诉求描述', trigger: 'blur' }],
    appealLabelCode: [{ required: true, message: '请选择诉求领导标签', trigger: 'blur' }],
    involveDepartment: [{ required: true, message: '请选择预涉及部门', trigger: 'blur' }]
  })
  const appealsLabels = ref([])
  const appealCategories = ref([])
  const filteredOrgans = ref([])
  const serviceFormRef = ref(null)
  const currentSelectedParentNode = ref('')
  let currentSelectedOrgans = {}
  const serviceId = computed(() => {
    return route.params.id
  })
  const isEdit = computed(() => {
    return !!serviceId.value
  })

  onMounted(() => {
    fetchAppealsLabels()
    fetchAppealsCategories()
  })

  const recursiveCategories = (categories) => {
    categories.forEach((cate) => {
      cate.value = cate.categoryCode
      cate.label = cate.categoryName
      if (cate.children && cate.children.length) {
        recursiveCategories(cate.children)
      }
    })
  }

  const fuzzySearchOrganByKeyword = async (queryString, cb) => {
    if (queryString) {
      const resp = await getAppealsOrgan({ keyword: queryString })
      filteredOrgans.value = resp.data.data
      const data = resp.data.data.map((organ) => {
        return {
          value: organ.organizationName,
          ...organ
        }
      })
      cb(data)
    } else {
      cb([])
    }
  }

  const handleNodeClick = (nodeProps) => {
    const currentNodeContext = toRaw(nodeProps)
    if (currentNodeContext.isLeaf) {
      const parentNode = toRaw(currentNodeContext.parent)
      currentSelectedParentNode.value = parentNode.data.categoryCode
    }
  }

  const handleOrganSelected = (organName) => {
    const selected = filteredOrgans.value.filter((organ) => organ.organizationName === toRaw(organName.value))
    currentSelectedOrgans = toRaw(selected[0])
  }

  const fetchAppealsLabels = () => {
    loading.value = true
    getAppealsLabels()
      .then((res) => {
        loading.value = false
        if (res.data.code === 0) {
          appealsLabels.value = res.data.data
        } else {
          ElMessage.error({ message: res.data.msg })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const fetchAppealsCategories = () => {
    loading.value = true
    getAllAppealCategories()
      .then((res) => {
        loading.value = false
        if (res.data.code === 0) {
          const data = res.data.data
          recursiveCategories(data)
          appealCategories.value = data
        } else {
          ElMessage.error({ message: res.data.msg })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleInvolveDepartmentChange = (dept, status) => {
    dept.checked = status
    if (status) {
      const exists = serviceForm.involveDepartment.filter((iDept) => iDept.name === dept.name)
      if (!exists.length) {
        serviceForm.involveDepartment.push(dept)
      }
    } else {
      serviceForm.involveDepartment = serviceForm.involveDepartment.filter((iDept) => iDept.name !== dept.name)
    }
  }

  const handleUploadExceed = () => {
    ElMessage.warning(`上传文件总数不得超过6个!`)
  }

  const beforeImageUpload = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 10) {
      ElMessage.error('图片大小不能超过10MB!')
      return false
    }
    return true
  }

  const handleSubmit = () => {
    serviceFormRef.value.validate((valid) => {
      if (valid) {
        const appealPayload = toRaw(serviceForm)
        appealPayload.appealCategoryCode = currentSelectedParentNode.value
        appealPayload.involveDepartment = appealPayload.involveDepartment.map((dept) => dept.name).join(',')
        appealPayload.involveDepartment = `${appealPayload.involveDepartment},${appealPayload.otherInvolveDepartment}`
        const postPayload = {
          dto: {
            ...appealPayload
          },
          organization: {
            ...currentSelectedOrgans
          }
        }
        // 删除无需传递给后端的字段
        delete postPayload.dto.organization
        delete postPayload.dto.organizationName
        delete postPayload.dto.otherInvolveDepartment
        if (isEdit.value) {
          sendUpdateAppealRequest(postPayload)
        } else {
          sendAppealApplyRequest(postPayload)
        }
      } else {
        return false
      }
    })
  }
  // 发布诉求申请
  const sendAppealApplyRequest = async (postPayload) => {
    btnLoading.value = true
    applyAppeal(postPayload)
      .then((res) => {
        loading.value = false
        if (res.data.code === 0) {
          ElMessage.success({ message: '代理诉求提交成功！' })
          setTimeout(() => {
            router.push({
              name: 'AppealList',
              query: {}
            })
          }, 1500)
        } else {
          ElMessage.error({ message: res.data.msg })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    btnLoading.value = false
  }
  // 编辑诉求请求
  const sendUpdateAppealRequest = () => {
    btnLoading.value = true
    btnLoading.value = false
  }
</script>

<style lang="scss" scoped>
  .page_main {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 15px 20px;
    overflow: auto;
  }
</style>
