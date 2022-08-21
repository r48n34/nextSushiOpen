import axios from "axios"
import { StoreInfo, StoreQueueReduce } from '../interface/sushiInterface'
import { genspecificStoreTicket, genStoreInfoApi } from "../data/getSushiApi";

async function getSingleStoreQueue(id: string | number){

    let singleStoreQueue = (await axios.get( genspecificStoreTicket(id) )).data;
    singleStoreQueue = {
        boothQueue: singleStoreQueue.boothQueue,
        mixedQueue: singleStoreQueue.mixedQueue
    }

    return singleStoreQueue

}

async function getAllStorewaitInfo(){

    let allStoreData = (await axios.get( genStoreInfoApi() )).data;
    allStoreData = allStoreData.map( (v:StoreInfo) => {
        return{
            id: v.id,
            name: v.name,
            storeStatus: v.storeStatus,
            wait: v.wait,
            waitingGroup: v.waitingGroup,
            address: v.address,
            region: v.region,
            position: [v.latitude, v.longitude]
        }
    })
    .sort( (a:StoreQueueReduce, b:StoreQueueReduce) => a.id - b.id );

    return allStoreData
}

export { getSingleStoreQueue, getAllStorewaitInfo }