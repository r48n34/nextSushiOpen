import type { NextApiRequest, NextApiResponse } from 'next'
import { StoreInfo } from '../../interface/sushiInterface'

import { getSingleStoreQueue, getAllStorewaitInfo } from "../../services/sushiServices"

export const config = {
    runtime: 'experimental-edge',
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        
        const getId = req.query.id as string || "-1";
        const getMethod = req.query.method as string || "All";

        if(getMethod !== "All" && getMethod !== "OnlyQueue" && getMethod !== "QueueAndWaitTime"){
            throw new Error("Invalid method input.");
        }

        let singleStoreQueue;
        if(getMethod === "OnlyQueue"){
            singleStoreQueue = await getSingleStoreQueue(getId);

            if(!singleStoreQueue.boothQueue){
                throw new Error("Store id not exist.");
            }

            res.status(200).json({ status: true, data: { singleStoreQueue } });
            return;
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

                res.status(200).json({ status: true, data: { errorMsg: "", allStoreData, singleStoreQueue } })
                return;
            }

        }
        else{
            res.status(200).json({ status: true, data: { allStoreData } });
            return;
        }

        res.status(200).json({ status: true, data: { errorMsg: "", allStoreData } })
        return;

    }
    catch(err){
        console.log(err)
        res.status(500).json({ status: false, data: { errorMsg: err } });
        return;
    }
    
}