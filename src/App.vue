<template>
  <a-config-provider :locale="zhCN">
    <router-view></router-view>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    provide('$moduleName', 'lava-fe-example')
    return {
      zhCN
    }
  }
})

</script>

<style lang="scss">
</style>
