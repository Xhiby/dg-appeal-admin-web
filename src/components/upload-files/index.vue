<template>
  <el-upload
    ref="upload"
    :file-list="$fileList"
    :class="[customClassName]"
    :action="action"
    :headers="headers"
    :data="data"
    :accept="accept"
    :multiple="multiple"
    :show-file-list="showFileList"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-progress="handleProgress"
    :on-change="handleChange"
    :on-exceed="handleExceed"
    :before-upload="beforeUpload"
    :before-remove="beforeRemove"
    :list-type="listType === 'custom' ? 'text' : listType"
    :auto-upload="autoUpload"
    :disabled="disabled"
    :limit="limit">
    <!-- 如果可以上传 -->
    <template v-if="canUpload">
      <!-- 自定义样式 -->
      <template v-if="listType === 'custom'">
        <slot></slot>
      </template>
      <!-- 照片墙样式 -->
      <el-icon v-else-if="listType === 'picture-card'"><Plus></Plus></el-icon>
      <!-- 非照片墙样式 -->
      <el-button
        v-else
        :plain="btnPlain"
        :type="btnType"
        :icon="btnIcon"
        :loading="btnLoading">
        {{ btnTxt }}
      </el-button>
    </template>
    <!-- 提示文字 -->
    <template
      v-if="showTip"
      #tip>
      <div
        class="el-upload__tip"
        style="line-height: 1.5em">
        <slot name="tip">{{ tip }}</slot>
      </div>
    </template>
  </el-upload>
</template>

<script>
  import { downloadFileByA } from '@/utils/index'
  import * as apis from '@/apis/index'
  export default {
    name: 'YpUploadFiles',
    props: {
      // 自定义类名
      customClassName: {
        type: String,
        default: ''
      },
      // 是否多选
      multiple: {
        type: Boolean,
        default: false
      },
      // 上传附带的额外参数
      data: {
        type: Object,
        default: () => ({})
      },
      // 是否显示上传列表
      showFileList: {
        type: Boolean,
        default: true
      },
      // 接受的文件类型
      accept: {
        type: String,
        default: ''
        /*  //  pdf
      'application/pdf,' +
      //  xls
      'application/vnd.ms-excel,' +
      //  xlsx
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' +
      //  doc
      'application/msword,' +
      //  docx
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document,' +
      //  pptx
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      accept=".doc, .docx" */
      },
      // 列表类型 text/picture/picture-card
      listType: {
        type: String,
        default: 'text'
      },
      // 是否自动上传
      autoUpload: {
        type: Boolean,
        default: true
      },
      // 文件列表
      files: {
        type: Array,
        default: () => {
          return []
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      // 限制数量
      limit: {
        type: Number,
        default: 0
      },
      // 提示信息
      tip: {
        type: String,
        default: ''
      },
      // 文件最大大小（单位M）
      maxSize: {
        type: Number,
        default: 10
      },
      // 是否显示提示
      showTip: {
        type: Boolean,
        default: true
      },
      // 文件数量超出的提示语
      exceedErrorMessage: {
        type: String,
        default: '上传失败，文件数量过多！'
      },
      // 是否可以上传
      canUpload: {
        type: Boolean,
        default: true
      },
      // 是否只读
      readonly: {
        type: Boolean,
        default: false
      },
      // 按钮类型
      btnType: {
        type: String,
        default: 'primary'
      },
      // 是否为朴素按钮
      btnPlain: {
        type: Boolean,
        default: false
      },
      // 按钮图标
      btnIcon: {
        type: String,
        default: ''
      },
      // 按钮文字
      btnTxt: {
        type: String,
        default: '点击上传'
      }
    },
    emits: ['update:files', 'success-upload', 'on-preview', 'success-remove'],
    data() {
      return {
        // 上传按钮loading
        btnLoading: false,
        beforeUploadChecked: false
      }
    },
    computed: {
      $fileList: {
        get() {
          return this.files
        },
        set(newFileList) {
          this.$emit('update:files', newFileList)
        }
      },
      // 上传地址
      action() {
        return apis.uploadUrl
        // return 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15'
      },
      // 上传携带凭证
      headers() {
        // const token = localStorage.getItem('token') || ''

        return {
          // Authorization: 'Bearer ' + token
        }
      }
    },
    methods: {
      // 上传成功
      handleSuccess(res, file) {
        this.btnLoading = false
        // 自动上传的话 需要判断code
        if (res.code === 0 || res === 'OK') {
          if (!this.readonly) {
            /**
             * uid给el做key,
             * name: 给el做名字
             */
            this.$fileList.push({
              uid: file.uid,
              name: file.name,
              url: file.url,
              ...res.data
            })
          }
          // 执行上传成功后的回调
          this.$emit('success-upload', file, res)
        } else {
          this.$refs.upload.clearFiles()
          this.$message.error('上传文件出错')
        }
      },
      // 上传文件出错
      handleError(error) {
        this.btnLoading = false
        console.log('上传文件出错', error)
        this.$message.error('文件上传出错!')
      },
      // 点击文件列表中的文件
      handlePreview(file) {
        const { downloadUrl, originName } = file
        if (downloadUrl && originName) {
          downloadFileByA(downloadUrl, originName)
        }
        this.$emit('on-preview', file)
      },
      // 删除文件
      handleRemove(file) {
        const index = this.$fileList.findIndex((item) => {
          return item.uid === file.uid
        })
        this.$fileList.splice(index, 1)
        // 执行删除的回调
        this.$emit('success-remove')
      },
      // 文件上传
      handleProgress() {
        // console.log('progress', e, file, fileList)
      },
      // 文件上传
      handleChange(file) {
        // 如果是非自动上传 则只需要把file回传
        if (!this.autoUpload) {
          this.$emit('success-upload', file)
        }
      },
      // 文件上传之前
      beforeUpload(file) {
        this.btnLoading = true
        // 如果存在类型 并且 文件不在规定类型中的话 则上传失败
        if (
          this.accept &&
          this.accept.search(file.type) === -1 &&
          this.accept
            .replace(/\s+/g, '')
            .split(',')
            .filter((ext) => file.name.endsWith(ext)).length <= 0
        ) {
          this.btnLoading = false
          this.$message.warning('上传失败，文件格式不正确！')
          this.beforeUploadChecked = true
          return false
        }
        if (file.size / 1024 / 1024 > this.maxSize) {
          this.btnLoading = false
          this.$message.warning(`上传失败，文件大于${this.maxSize}M`)
          this.beforeUploadChecked = true
          return false
        }
      },
      /**
       * 删除文件列表中的文件
       *  + 如果是上传失败的文件直接移除
       *  + 如果是本身的文件则需要进行提示
       * @param {*} file
       * @param {*} fileList
       */
      beforeRemove(file) {
        if (this.beforeUploadChecked) {
          this.beforeUploadChecked = false
          return true
        } else {
          return this.$confirm(`确定移除 ${file.name}？`)
        }
      },
      // 文件超出个数限制
      handleExceed() {
        this.btnLoading = false
        this.$message.warning(this.exceedErrorMessage)
      }
    }
  }
</script>

<style lang="scss">
  .yp_avatar_upload {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    .uploader-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 148px;
      height: 148px;
      background-color: #fafafa;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      cursor: pointer;
      &:hover {
        border-color: #409eff;
      }
      & i {
        font-size: 28px;
        color: #8c939d;
      }
    }
  }
</style>
