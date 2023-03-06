<script setup lang="ts">
import { darkTheme, NConfigProvider } from 'naive-ui'


import { useAllStoreDataStore } from '~~/store/allStoreDataStore';
import { useSingleStoreDataStore } from '~~/store/singleStoreDataStore';

const data = useSingleStoreDataStore()
const allStoreData = useAllStoreDataStore()

allStoreData.getAllStoreData();
watchEffect(() => console.log(data.storeData?.allStoreData))

</script>

<template>
<n-config-provider :theme="darkTheme">
    <div>
    
        <br>
        <!-- <n-h1>
            This is an auto-imported component
            {{ data.storeData ? data.storeData.allStoreData.name : "N/A"}}
        </n-h1> -->

    </div>

</n-config-provider>
</template>
