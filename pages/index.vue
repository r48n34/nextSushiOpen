<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useAllStoreDataStore } from '~~/store/allStoreDataStore';

import { useSingleStoreDataStore } from '~~/store/singleStoreDataStore';


const data = useSingleStoreDataStore()
const allStoreData = useAllStoreDataStore()

allStoreData.getAllStoreData();
data.getStoreData(11)

watchEffect(() => console.log(data.storeData))

</script>

<template>

    <div style="padding: 24px;">
        <h1>Welcome to the homepage</h1>
        <n-button type="primary">naive-ui</n-button>
        <br>
        <AppAlert>
            This is an auto-imported component
            {{ data.storeData ? data.storeData.allStoreData.name : "N/A"}}
        </AppAlert>
    </div>


</template>