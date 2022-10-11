<template>
  <ul
    v-if="list.length > 0"
    class="yp_docs_list">
    <li
      v-for="item in list"
      :key="item.id"
      class="yp_docs_list_item">
      <div
        class="yp_docs_list_item_name"
        :title="item.originName">
        <el-icon><Document></Document></el-icon>
        {{ item.originName }}
      </div>
      <el-button
        class="yp_docs_list_item_"
        style="position: absolute; right: 25px; top: 50%; transform: translateY(-50%)"
        type="text"
        @click="onDownload(item)">
        下载
      </el-button>
      <!-- 删除 -->
      <el-icon
        v-if="showDelete"
        @click="onDelete">
        <Close></Close>
      </el-icon>
    </li>
  </ul>
  <p v-else>无文件</p>
</template>

<script>
  export default {
    name: 'YpFileList',
    props: {
      // 文件列表
      list: {
        type: Array,
        required: true,
        default: () => {
          return []
        }
      },
      // 是否显示删除icon
      showDelete: {
        type: Boolean,
        default: false
      }
    },
    emits: ['delete'],
    methods: {
      onDelete() {
        // 文件删除回调
        this.$emit('delete')
      },
      onDownload(item) {
        // 不确定是否是downloadUrl
        window.open(item.downloadUrl, '_blank')
      }
    }
  }
</script>

<style lang="scss">
  .yp_docs_list {
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    .yp_docs_list_item {
      position: relative;
      transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
      font-size: 14px;
      color: #606266;
      line-height: 32px;
      position: relative;
      border-radius: 4px;
      width: 100%;
      cursor: pointer;
      list-style: none;
      &:hover {
        background-color: #f5f7fa;
        .el-icon-close {
          display: inline-block;
        }
      }
      .yp_docs_list_item_name {
        color: #606266;
        display: block;
        margin-right: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: color 0.3s;
        padding-left: 5px;
        white-space: nowrap;
        font-size: 14px;
        & > i {
          height: 100%;
          margin-right: 7px;
          color: #909399;
          line-height: inherit;
        }
      }
      .el-icon-close {
        display: none;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 5px;
        cursor: pointer;
        opacity: 0.75;
        color: #606266;
        &:hover {
          opacity: 1;
        }
      }
    }
    .yp_docs_list_item + .yp_docs_list_item {
      margin-top: 5px;
    }
  }
</style>
