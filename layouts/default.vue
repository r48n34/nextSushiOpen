<script setup lang="ts">
import { NGrid, NGi } from 'naive-ui'
import { useSingleStoreDataStore } from '~~/store/singleStoreDataStore';

const data = useSingleStoreDataStore()

</script>

<template>
<div>
    <n-grid x-gap="12" :cols="4">
    <n-gi>
        {{ data.storeData ? data.storeData.allStoreData.name : ""}}
    </n-gi>
    <n-gi>
        <div></div>
    </n-gi>
    <n-gi>
        <div></div>
    </n-gi>
    <n-gi>
      <StoreSelect />
    </n-gi>
  </n-grid>
</div>
</template>