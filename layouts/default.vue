<script setup lang="ts">
import { darkTheme, NConfigProvider } from 'naive-ui'
import { NGrid, NGi, NH1, NH4 } from 'naive-ui'

import { useTimestamp } from '@vueuse/core'
import { useSingleStoreDataStore } from '~~/store/singleStoreDataStore';

const timestamp = useTimestamp({ offset: 0 })
const data = useSingleStoreDataStore()

</script>

<template>
<n-config-provider :theme="darkTheme">

<div>
    <n-grid x-gap="12" :cols="2">
      <n-gi>

        <template v-if="data.storeData">
            <n-h1 style="margin: 0;">
              {{ data.storeData.allStoreData.name }}
            </n-h1>
    
            <n-h4 style="margin: 0;">
              Last Update: {{ data.lastUpdate.toTimeString().slice(0,9) }}
            </n-h4>

            <n-h4 style="margin: 0;">
              Current: {{ new Date(timestamp).toTimeString().slice(0,9) }}
            </n-h4>
        </template>

      </n-gi>

      <n-gi >
        <StoreSelect />
      </n-gi>
    </n-grid>
</div>

</n-config-provider>
</template>