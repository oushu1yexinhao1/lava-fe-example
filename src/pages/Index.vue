<template>
  <h1>Hello, {{ appName }}!</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  components: {},
  props: {},
  emits: [],
  setup() {
    return {
      appName: process.env.VUE_APP_NAME
    }
  }
})
</script>

<style lang="scss">
</style>
