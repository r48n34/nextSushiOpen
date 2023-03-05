<script setup lang="ts">
import { NButton } from 'naive-ui'

import { useAllStoreDataStore } from '~~/store/allStoreDataStore';
import { useSingleStoreDataStore } from '~~/store/singleStoreDataStore';


const data = useSingleStoreDataStore()
const allStoreData = useAllStoreDataStore()

allStoreData.getAllStoreData();
watchEffect(() => console.log(data.storeData?.allStoreData))

</script>

<template>

    <div>
        <Header></Header>

        <br>
        <AppAlert>
            This is an auto-imported component
            {{ data.storeData ? data.storeData.allStoreData.name : "N/A"}}
        </AppAlert>
    </div>


</template>