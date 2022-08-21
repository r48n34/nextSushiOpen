import { useEffect, useState } from 'react';
import axios from "axios"
import useInterval from 'react-useinterval';
import { showNotification } from '@mantine/notifications';

import { callLoadingSwal, closeSwal } from "../utilis/swalCall"
import { useRecoilState } from 'recoil';
import { allStoreInfoState } from '../atoms/allStoreInfo';
import { RecivedRootData } from '../interface/sushiInterface';


export function useStoreQueue(selectedId: string | null):any {
    const callApiPath = `/api/sushiCall?id=${selectedId}&method=QueueAndWaitTime`;

    const [ data, setData ] = useRecoilState<RecivedRootData | null>(allStoreInfoState);

    const [ initLoading, setInitLoading ] = useState<boolean>(true); // is first time loading 
    const [ loading, setLoading ] = useState<boolean>(false); // is fetching in progress
    const [ error, setError ] = useState<string | null>(null); // error of fetch messgae
    const [ stopManuelfetch, setStopManuelfetch ] = useState(false); // delay of clicking fetch btn

    useEffect( () =>{
        if(selectedId && selectedId!== null){
            fetchData();
        }
    },[selectedId])

    async function manuelFetch(){

        if(stopManuelfetch){
            showNotification({
                title: 'Error',
                color: 'red',
                message: 'You can not fetch too fast. Please wait.',
                autoClose: 4500,
            })
            return false;
        }

        showNotification({
            title: 'Fetching',
            message: 'You request is processing.',
            autoClose: 4500,
        })

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

            showNotification({
                title: 'Updated',
                message: 'New queue info is here!',
                autoClose: 1500,
            })
        }
        catch(err:any){
            setData(null);
            setError(err.message);

            showNotification({
                title: 'Error',
                color: 'red',
                message: 'Current data occur error.',
                autoClose: 1500,
            })
        }
        finally{
            setLoading(false);
            setInitLoading(false);

            closeSwal();
        }
    }
   
    useInterval(fetchData, 15000);
    useInterval(() => {
        setStopManuelfetch(false);
    }, 4000);
    
    //allStore, isLoading, isError, manuelFetch
    return [ loading, error, manuelFetch, initLoading, setInitLoading ]
}