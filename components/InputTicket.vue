<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NModal, NInputNumber, NSelect, NText } from 'naive-ui'

defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const showModal = ref(false)
const internalTicketNumber = ref(500)
const internalTicketCall = ref(10)

const selectOptions = [2,5,10,15,20,25,30].map( v => {
    return {
        label: v+"",
        value: v+"",
    }
})

function setOutsideNum(){
    emit('update:modelValue', internalTicketNumber)
}

</script>

<template>
    <n-button @click="showModal = true">
      Start Me up
    </n-button>

    <n-modal 
      v-model:show="showModal"
      style="width: 600px"
      class="custom-card"
      preset="card"
      title="Modal"
      :bordered="false"
      size="huge"
    >
        <template #header-extra>
        </template>

        <br/>
        <n-text depth="3">
            Your ticket
        </n-text>
        <n-input-number
            v-model:value="internalTicketNumber"
        />

        <br/>
        <n-text depth="3">
            Time to call
        </n-text>
        <n-select v-model:value="internalTicketCall" :options="selectOptions" />


    </n-modal>
  </template>