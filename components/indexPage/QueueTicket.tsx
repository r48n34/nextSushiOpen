import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useRecoilState } from 'recoil';
import { allStoreInfoState } from '../../atoms/allStoreInfo';

function QueueTicket({ refreshFunc }:{ refreshFunc:Function }){

    const [ allStore, setAllStore ] = useRecoilState<any>(allStoreInfoState);

    return(
        <>
        <h2>Queue ticket <Button onClick={ () => refreshFunc() }>Refresh</Button> </h2>

        <div style={{ textAlign:"center"}}>
          <Grid container spacing={2}>
            {allStore.data.singleStoreQueue.boothQueue.map( (v:string) => (
              <Grid key={v} item xs={4}>
                <h1 style={{ margin:"0" }}>{v}</h1>
              </Grid>
            ))}
          </Grid>
        </div>
    </>
    )

}

export default QueueTicket