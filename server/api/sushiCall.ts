import { StoreInfo } from "~~/interface/sushiInterface";
import { getSingleStoreQueue, getAllStorewaitInfo } from "~~/services/sushiServices";

export default defineEventHandler( async (event) => {
    const query = getQuery(event)

    console.log(query);
    
    try{
        
        const getId = query.id as string
        const getMethod = query.method as string || "All";

        if(getMethod !== "All" && getMethod !== "OnlyQueue" && getMethod !== "QueueAndWaitTime"){
            throw new Error("Invalid method input.");
        }

        let singleStoreQueue;
        if(getMethod === "OnlyQueue"){
            singleStoreQueue = await getSingleStoreQueue(getId);

            if(!singleStoreQueue.boothQueue){
                throw new Error("Store id not exist.");
            }

            return { status: true, data: { singleStoreQueue } };
        }

        let allStoreData = await getAllStorewaitInfo();

        if( getId !== "-1" ){
            const foundIndex = allStoreData.findIndex( (v:StoreInfo) => v.id == +getId );

            if(foundIndex === -1){
                throw new Error("Store id not exist.")
            }

            allStoreData = allStoreData[foundIndex];

            if(getMethod === "QueueAndWaitTime"){
                singleStoreQueue = await getSingleStoreQueue(getId);

                return { status: true, data: { errorMsg: "", allStoreData, singleStoreQueue } }
                
            }

        }
        else{
            return { status: true, data: { allStoreData } };
            
        }

        return { status: true, data: { errorMsg: "", allStoreData } }
       

    }
    catch(err){
        console.log(err)
        return { status: false, data: { errorMsg: err } };
      
    }
})