import { defineStore } from 'pinia'
import { Data } from '~~/interface/sushiInterface';

export const useSingleStoreDataStore = defineStore('singleStoreDataStore', () => {
    
    const storeData = ref<null | Data>(null)
    const lastUpdate = ref<Date>(new Date())
    const initLoading = ref<boolean>(false)

    let interviewEvent: any = null;

    function setLoading(){
        initLoading.value = true
    }

    async function getStoreData(storeId: number | string){
        if(!storeId){
            return
        }

        try {
            const callApiPath = `/api/sushiCall?id=${storeId}&method=QueueAndWaitTime`;
            let res = await fetch(callApiPath);
            let data = await res.json();
            
            storeData.value = data.data

            !!interviewEvent && clearInterval(interviewEvent)
            interviewEvent = setInterval( () => getStoreData(data.data.allStoreData.id), 10000)
        } 
        catch (error) {
            console.log(error);
        }

        lastUpdate.value = new Date()
        initLoading.value = false

    }
    
    return { getStoreData, storeData, lastUpdate, initLoading, setLoading }
})
