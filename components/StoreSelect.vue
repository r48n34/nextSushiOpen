<script setup lang="ts">
import { ref } from 'vue'
import { NSelect } from 'naive-ui'

import { useAllStoreDataStore } from '~~/store/allStoreDataStore';
import { useSingleStoreDataStore } from '~~/store/singleStoreDataStore';

const value = ref(null)

const singleStore = useSingleStoreDataStore()
const allStoreData = useAllStoreDataStore()

allStoreData.getAllStoreData();

const storeList = computed( () => allStoreData 
    ? allStoreData.allStoreData.map( v => {
        return {
            label: v.name,
            value: v.id
        }
    })
    : [{label : "Loading...", value: -1 }]
);


watchEffect(() => {    
    if(!value.value){
        return
    }

    singleStore.getStoreData(value.value)
})


</script>

<template>
    <n-select v-model:value="value" :options="storeList"/>
</template>