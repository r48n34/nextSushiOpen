<script setup lang="ts">
import { ref } from 'vue'
import { darkTheme, NConfigProvider, NDivider, NStatistic } from 'naive-ui'
import { NGrid, NGi, NH2 } from 'naive-ui'

import { useAllStoreDataStore } from '~~/store/allStoreDataStore';
import { useSingleStoreDataStore } from '~~/store/singleStoreDataStore';

const data = useSingleStoreDataStore()
const allStoreData = useAllStoreDataStore()

allStoreData.getAllStoreData();
watchEffect(() => console.log(data.storeData?.allStoreData))

const myTicket = ref<any>("Hello")


</script>

<template>
<n-config-provider :theme="darkTheme">
    <div>

        <template v-if="data.storeData">

            <n-divider title-placement="center">
                General Info
            </n-divider>

            <n-grid x-gap="12" :cols="2">
                <n-gi class="grid-items">
                    <n-statistic label="Minutes">
                        {{ data.storeData.allStoreData.wait }}
                    </n-statistic>
                </n-gi>
            
                <n-gi class="grid-items">
                    <n-statistic label="Queue">
                        {{ data.storeData.allStoreData.waitingGroup }}
                    </n-statistic>             
                </n-gi>
            </n-grid>

            <n-divider title-placement="center">
                Queue ticket
            </n-divider>

            <n-grid x-gap="12" :cols="3">
                
                <n-gi 
                    class="grid-items"
                    v-for="v in data.storeData.singleStoreQueue.boothQueue"
                >
                    <n-h2>
                        {{ v }}
                    </n-h2>
                </n-gi>
              
            </n-grid>

            <n-divider title-placement="center">
                Your ticket
            </n-divider>

            <InputTicket v-model="myTicket"/>

        </template>

    </div>
</n-config-provider>
</template>


<style scoped>
.grid-items {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>