import { Grid } from '@mantine/core';
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { allStoreInfoState } from "../../atoms/allStoreInfo";
import { tickerCallBeforeState } from "../../atoms/tickerCallBefore";
import { tickerNumberState } from "../../atoms/tickerNumber";
import { RecivedRootData } from "../../interface/sushiInterface";

import { askAndGetPermisstion, callNotifications } from "../../utilis/notificationsUtilis";
import FormDialog from "./FormDialog"

import useSound from 'use-sound';
// import rockSF from '/sounds/rock.mp3';

function UserQueueInfo(){

    const [ tickerNumber ] = useRecoilState<number>(tickerNumberState);
    const [ tickerCallBefore ] = useRecoilState<number>(tickerCallBeforeState);
    const [ allStore ] = useRecoilState<RecivedRootData | null>(allStoreInfoState);
    
    const [ isNotifications, setIsNotifications ] = useState(false);

    const [play] = useSound('/sounds/rock.mp3');

    useEffect( () =>{
        ( async () =>{
            let isPermitted:boolean = await askAndGetPermisstion();
            setIsNotifications(isPermitted);
        })()
    },[])

    const data = allStore ? allStore.data.singleStoreQueue.boothQueue : [-999];

    useEffect(() => {
        if(!data || data.length <= 2 || tickerNumber === -1){
            return;
        }

        if(isNotifications && tickerCallBefore >= tickerNumber - (+data[0])){
            console.log("Calling");
            play();
            callNotifications("Is near now!");
        }

    },[data])

    return (
        <>
        <h2>Your ticket  { data && data.length >= 3 && <FormDialog/>} </h2>
        {/* <FormDialog/> */}
        {/* <h2>Your ticket</h2> */}
        
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