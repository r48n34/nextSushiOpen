import { Grid, Group, Skeleton } from '@mantine/core';
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { allStoreInfoState } from "../../atoms/allStoreInfo";
import { tickerCallBeforeState } from "../../atoms/tickerCallBefore";
import { tickerNumberState } from "../../atoms/tickerNumber";
import { RecivedRootData } from "../../interface/sushiInterface";

import { askAndGetPermisstion, callNotifications } from "../../utilis/notificationsUtilis";
import FormDialog from "./FormDialog"
import useSound from 'use-sound';

function UserQueueInfo({ initLoading }:{ initLoading:boolean }){

    const [ tickerNumber ] = useRecoilState<number>(tickerNumberState);
    const [ tickerCallBefore ] = useRecoilState<number>(tickerCallBeforeState);
    const [ allStore ] = useRecoilState<RecivedRootData | null>(allStoreInfoState);
    
    const [ isNotifications, setIsNotifications ] = useState<boolean>(false);

    const [play] = useSound('/sounds/rock.mp3');

    useEffect( () =>{
        ( async () =>{
            let isPermitted:boolean = await askAndGetPermisstion();
            setIsNotifications(isPermitted);
        })()
    },[])

    const data = allStore && allStore.data && allStore.data.singleStoreQueue ? allStore.data.singleStoreQueue.boothQueue : [-999];

    

    useEffect(() => {
        if(!data || data.length <= 2 || tickerNumber === -1){
            return;
        }

        if(isNotifications && tickerCallBefore >= tickerNumber - (+data[0])){
            console.log("Calling");
            play();
            callNotifications("Is near now!");
            !!window && window.navigator.vibrate([200, 100, 200]);
        }

    },[data])

    if(initLoading){
        return(
            <>
                <Skeleton height={25} radius="xl" width="16%" style={{ marginTop: "25px" }} />
            </>
        )
    }

    return (
        <>
        <Group>
            <h2 style={{ margin: 0 }}>Your ticket</h2>
            { data && data.length >= 3 && <FormDialog/>}
        </Group>
        
        { tickerNumber !== -1 && (

            <Grid style={{ textAlign:"center" }}>
                <Grid.Col span={6}>
                    <h1 style={{ margin:"0", fontSize:"4rem" }}>{tickerNumber || ""}</h1>
                    <h3 style={{ margin:"0" }}>Your Ticket</h3>
                </Grid.Col>
                <Grid.Col span={6}>
                    <h1 style={{ margin:"0", fontSize:"4rem" }}>{tickerNumber - (+data[0]) || "N/A"}</h1>
                    <h3 style={{ margin:"0" }}>Left Queue</h3>
                </Grid.Col>
            </Grid>
        )}
        </>
    )
}

export default UserQueueInfo