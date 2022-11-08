<template>
  <a-config-provider :locale="zhCN" :prefixCls="modifyVars['@ant-prefix']">
    <router-view></router-view>
    <lava-dev-tools />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import LavaDevTools from '@/smart-ui-vue/lava/LavaDevtools/index.vue'
import { useRouter } from 'vue-router'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const modifyVars = require('/src/smart-ui-vue/modifyVars')

export default defineComponent({
  name: 'App',
  components: {
    LavaDevTools
  },
  setup() {
    provide('$moduleName', 'lava-fe-example')

    const router = useRouter()
    // 加载中loading状态
    router.beforeEach((to, from) => {
      const ele = document.getElementById('example-loadingio-spinner-double-ring-common-container')
      if (ele)
        ele.style.display = 'inline-block'
    })
    router.afterEach((to, from) => {
      const ele = document.getElementById('example-loadingio-spinner-double-ring-common-container')
      if (ele) {
        ele.style.position = 'absolute'
        ele.style.display = 'none'
      }
    })
    return {
      zhCN,
      modifyVars,
    }
  }
})

</script>

<style lang="scss">
</style>
