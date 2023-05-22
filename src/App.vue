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
    const APP_NAME = process.env.VUE_APP_NAME
    provide('$moduleName', `lava-fe-${APP_NAME}`)

    const router = useRouter()
    // 切换路由时的 loading 效果
    router.beforeEach((to, from) => {
      const ele = document.getElementById(`${APP_NAME}-global-loading-container`)
      if (ele)
        ele.style.display = 'inline-block'
    })
    router.afterEach((to, from) => {
      const ele = document.getElementById(`${APP_NAME}-global-loading-container`)
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
