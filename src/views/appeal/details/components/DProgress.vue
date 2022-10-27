<template>
  <div class="progress">
    <div
      v-for="(item, index) in progressList"
      :key="index"
      class="progress_item"
      :style="getStatusInfo(index).style">
      <p class="progress_item_name">{{ item.processLabel || '--' }}</p>
      <img
        class="progress_item_icon"
        :src="getStatusInfo(index).icon"
        alt="" />
      <p class="progress_item_time">{{ item.createdAt }}</p>
    </div>
  </div>
</template>

<script setup>
  import iconFinished from '@/assets/images/appeal-details/icon_completed.png'
  import iconPending from '@/assets/images/appeal-details/icon_ongoing.png'
  import { computed } from 'vue'

  const props = defineProps({
    active: {
      type: [Number, String],
      default: 2
    },
    progressList: {
      type: Array,
      default() {
        return []
      }
    }
  })

  const getStatusInfo = computed(() => {
    return (index) => {
      let status = ''
      if (index < props.active) {
        status = 'finished'
      }
      if (index === props.active) {
        status = 'process'
        if (index === props.progressList.length - 1) {
          status = 'finished'
        }
      }
      if (index > props.active) {
        status = 'pending'
      }
      return {
        finished: {
          icon: iconFinished,
          style: {
            '--before-line-color': '#67C23A',
            '--after-line-color': '#67C23A',
            '--item-name-color': '#67C23A'
          }
        },
        process: {
          icon: iconFinished,
          style: {
            '--before-line-color': '#67C23A',
            '--after-line-color': '#E6A23C',
            '--item-name-color': '#67C23A'
          }
        },
        pending: {
          icon: iconPending,
          style: {
            '--before-line-color': '#E6A23C',
            '--after-line-color': '#E6A23C',
            '--item-name-color': '#E6A23C'
          }
        }
      }[status]
    }
  })
</script>

<style lang="scss" scoped>
  $-padding-x: 16px;
  $-margin-right: 24px;
  $-icon-size: 30px;
  .progress {
    display: flex;
    &_item {
      flex: none;
      position: relative;
      padding: 0 $-padding-x;
      margin-right: $-margin-right;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0, -50%);
        width: calc(50% - $-icon-size / 2);
        height: 2px;
        background-color: var(--before-line-color);
      }
      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(24px, -50%);
        width: calc(50% - $-icon-size / 2 + $-margin-right);
        height: 2px;
        background-color: var(--after-line-color);
      }
      &:last-child {
        margin-right: 40px;
        &::after {
          transform: translate(0, -50%);
          width: calc(50% - $-icon-size / 2);
        }
      }
      &_name {
        font-size: 14px;
        color: var(--item-name-color);
        font-weight: 500;
      }
      &_icon {
        width: $-icon-size;
        height: $-icon-size;
        margin: 8px 0;
      }
      &_time {
        color: #909399;
      }
    }
  }
</style>
