<template>
  <SideLogo></SideLogo>
  <SideMenu></SideMenu>
</template>

<script>
  import { defineComponent } from 'vue'
  import SideLogo from './components/SideLogo.vue'
  import SideMenu from './components/SideMenu.vue'

  export default defineComponent({
    name: 'DGSidebar',
    components: { SideLogo, SideMenu },
    setup() {
      return {}
    }
  })
</script>
