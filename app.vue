<script lang="ts">
  import { defineComponent } from 'vue'
  import { darkTheme, NConfigProvider, NGlobalStyle } from 'naive-ui'

  export default defineComponent({
    setup() {
      return {
        darkTheme
      }
    }
  })

</script>

<template>
  <div>
    <n-config-provider :theme="darkTheme" inline-theme-disabled>
      <NuxtPage />
      <n-global-style />
    </n-config-provider>
  </div>
</template>
