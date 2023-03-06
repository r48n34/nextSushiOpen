<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NModal, NCard } from 'naive-ui'

defineProps(['modelValue'])
defineEmits(['update:modelValue'])

const showModal = ref(false)

</script>

<template>
    <n-button @click="showModal = true">
      Start Me up
    </n-button>
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px"
        title="Modal"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <template #header-extra>
          Oops!
          <input
              :value="modelValue"
              @input="(event: any) => $emit('update:modelValue', event.target.value)"
          />
        </template>

      </n-card>
    </n-modal>
  </template>