import { defineStore } from 'pinia'
import { Data } from '~~/interface/sushiInterface';

export const useSingleStoreDataStore = defineStore('singleStoreDataStore', () => {
    
    const storeData = ref<null | Data>(null)
    const lastUpdate = ref<Date>(new Date())

    let interviewEvent: any = null;

    async function getStoreData(storeId: number | string){
        if(!storeId){
            return
        }

        const callApiPath = `/api/sushiCall?id=${storeId}&method=QueueAndWaitTime`;
        let res = await fetch(callApiPath);
        let data = await res.json();

        storeData.value = data.data
        lastUpdate.value = new Date()

        !!interviewEvent && clearInterval(interviewEvent)
        interviewEvent = setInterval( () => getStoreData(data.data.allStoreData.id), 10000)
    }
    
    return { getStoreData, storeData, lastUpdate }
})
