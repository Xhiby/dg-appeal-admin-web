<template>
  <div class="appeals">
    <cool-title title="累计处理诉求量(虎门)"></cool-title>
    <div class="cards">
      <dl class="card-box">
        <dt>累计接受述求总量</dt>
        <dd>146311</dd>
      </dl>
      <dl class="card-box">
        <dt>累计接受述求总量</dt>
        <dd>146311</dd>
      </dl>
    </div>
  </div>
</template>

<script setup>
  import CoolTitle from '@/components/cool-title.vue'
</script>

<style lang="scss" scoped>
  .appeals {
    height: 100%;
  }
  .cards {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 78%;
  }

  .card-box {
    width: 45%;
    height: 80%;
    background: rgba(0, 211, 255, 0.11);
    border-radius: 6px 6px 6px 6px;
    padding: 10px;
    line-height: 3rem;
    dt {
      color: #29f1fa;
    }
    dd {
      color: #ffffff;
      font-size: 2rem;
    }
  }
</style>
