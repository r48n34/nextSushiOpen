import { useEffect, useState } from 'react';
import axios from "axios"
import useInterval from 'react-useinterval';

import { callLoadingSwal, closeSwal } from "../utilis/swalCall"
import { useRecoilState } from 'recoil';
import { allStoreInfoState } from '../atoms/allStoreInfo';

export function useStoreQueue(selectedId: string | null):any {
    const callApiPath = `/api/sushiCall?id=${selectedId}&method=QueueAndWaitTime`;

    const [ data, setData ] = useRecoilState(allStoreInfoState);


    //const [ data, setData ] = useState([]); // fetched data
    const [ initLoading, setInitLoading ] = useState(true); // is first time loading 
    const [ loading, setLoading ] = useState(false); // is fetching in progress
    const [ error, setError ] = useState(null); // error of fetch messgae
    const [ stopManuelfetch, setStopManuelfetch ] = useState(false); // delay of clicking fetch btn

    useEffect( () =>{
        if(selectedId && selectedId!== null){
            fetchData();
        }
    },[selectedId])

    async function manuelFetch(){

        if(stopManuelfetch){
            console.log("Wait");
            return false;
        }

        fetchData();
        setStopManuelfetch(true);
        return true;
    }

    async function fetchData(){

        if(!selectedId || selectedId === null){
            return;
        }

        if(initLoading){
            callLoadingSwal();
        }

        try{
            setError(null);
            setLoading(true);

            let data = await axios.get(callApiPath);
            setData(data.data);
        }
        catch(err:any){
            setData([]);
            setError(err);
        }
        finally{
            setLoading(false);
            setInitLoading(false);

            closeSwal();
        }
    }
   
    useInterval(fetchData, 10000);
    useInterval(() => setStopManuelfetch(false), 6000);
    //allStore, isLoading, isError, manuelFetch
    return [ loading, error, manuelFetch ]
}