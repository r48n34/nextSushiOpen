import axios from 'axios'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Data } from '../interface/sushiInterface'

interface SingleStoreState {
  singleStoreData: Data | null
  getStoreData: (storeId: number) => void
}

export const useSingleStore = create<SingleStoreState>()(
  devtools(
    (set) => ({
        singleStoreData: null,
        getStoreData: async (storeId: number | string) => {
            if(!storeId){
                return
            }

            const callApiPath = `/api/sushiCall?id=${storeId}&method=QueueAndWaitTime`;
            let data = await axios.get(callApiPath);
    
            console.log(data.data);
            set({ singleStoreData: data.data })
        },
    }),
  )
)