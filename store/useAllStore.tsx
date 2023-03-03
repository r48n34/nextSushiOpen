import axios from 'axios'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { AllStoreDataReduced } from '../interface/sushiInterface'

interface AllStoreState {
  allStoreData: AllStoreDataReduced[]
  getAllStoreData: () => void
}

export const useAllStore = create<AllStoreState>()(
  devtools(
    (set) => ({
        allStoreData: [],
        getAllStoreData: async () => {
            let data = await axios.get("/api/sushiCall?id=-1");
    
            console.log(data.data.allStoreData);
            set({ allStoreData: data.data.allStoreData })
        },
    }),
  )
)