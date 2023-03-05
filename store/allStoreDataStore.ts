import { defineStore } from 'pinia'
import { AllStoreDataReduced, Data } from '~~/interface/sushiInterface';

export const useAllStoreDataStore = defineStore('allStoreDataStore', () => {
    const allStoreData = ref<AllStoreDataReduced[]>([])

    async function getAllStoreData(){
       
        let res = await fetch(`/api/sushiCall?id=-1`);
        let data = await res.json();
        
        allStoreData.value = data.data.allStoreData
    }
    
    return { allStoreData, getAllStoreData }
})
