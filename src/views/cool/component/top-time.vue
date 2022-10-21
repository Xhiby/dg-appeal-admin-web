<template>
  <span class="time"> <span class="date">{{date}}</span> <span class="week">{{week}}</span> {{time}} </span>
</template>

<script setup>
import dayjs from "dayjs"
import { ref, onBeforeUnmount } from 'vue'
const znconf ={
  1:'一',
  2:'二',
  3:'三',
  4:'四',
  5:'五',
  6:'六',
  7:'日',
}
const date = dayjs().format('YYYY.MM.DD')
const week = `星期${dayjs().day()}`
const time = ref(`${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`)
const timer = setInterval(() => {
  time.value = `${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`
}, 60)
onBeforeUnmount(() => { clearInterval(timer) })
</script>
<style lang="scss" scoped>
 .date {
        color: #45a2ff;
      }

      .week {
        color: #45a2ff;
        margin-left: 8px;
        margin-right: 8px;
      }
</style>