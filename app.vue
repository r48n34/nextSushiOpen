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
  <div style="padding: 24px;">
    <n-config-provider :theme="darkTheme" inline-theme-disabled>
      <NuxtLayout></NuxtLayout>
      <NuxtPage />
      <n-global-style />
    </n-config-provider>
  </div>
</template>
