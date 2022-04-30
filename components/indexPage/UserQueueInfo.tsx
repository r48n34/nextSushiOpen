import Grid from "@mui/material/Grid";
import { useEffect } from "react";

import { useRecoilState } from "recoil";
import { allStoreInfoState } from "../../atoms/allStoreInfo";
import { tickerCallBeforeState } from "../../atoms/tickerCallBefore";
import { tickerNumberState } from "../../atoms/tickerNumber";

import { callNotifications } from "../../utilis/notificationsUtilis";
import FormDialog from "./FormDialog"

function UserQueueInfo(){

    const [ tickerNumber, setTickerNumber ] = useRecoilState(tickerNumberState);
    const [ tickerCallBefore, setTickerCallBefore ] = useRecoilState(tickerCallBeforeState);

    const [ allStore, setAllStore ] = useRecoilState<any>(allStoreInfoState);
    const data = allStore.data.singleStoreQueue.boothQueue;

    useEffect(() => {
        if(!data || data.length <= 2 || tickerNumber === -1){
            return;
        }

        if(tickerNumber - (+data[0]) >= tickerCallBefore){
            callNotifications("Is near now!");
        }

        console.log(data);
    },[data])

    return (
        <>
        <h2>Your ticket  { data && data.length >= 3 && <FormDialog/>} </h2>
        { tickerNumber !== -1 && (

            <Grid container spacing={2} sx={{ textAlign:"center" }}>
                <Grid item xs={6}>
                    <h1 style={{ margin:"0", fontSize:"4rem" }}>{tickerNumber || ""}</h1>
                    <h3 style={{ margin:"0" }}>Your Ticket</h3>
                </Grid>
                <Grid item xs={6}>
                    <h1 style={{ margin:"0", fontSize:"4rem" }}>{tickerNumber - (+data[0])}</h1>
                    <h3 style={{ margin:"0" }}>Left Queue</h3>
                </Grid>
            </Grid>
        )}
        </>
    )
}

export default UserQueueInfo