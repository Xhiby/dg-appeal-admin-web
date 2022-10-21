<template>
  <span class="time"> <span class="date">{{date}}</span> <span class="week">{{week}}</span> {{time}} </span>
</template>

<script setup>
import dayjs from "dayjs"
import { ref, onBeforeUnmount } from 'vue'
const date = dayjs().format('YYYY.MM.DD')
const week = `星期${dayjs().day()}`
const time = ref(`${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`)
const timer = setInterval(() => {
  time.value = `${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`
}, 60)
onBeforeUnmount(() => { clearInterval(timer) })
</script>