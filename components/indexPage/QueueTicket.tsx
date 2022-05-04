import { Grid } from '@mantine/core';

import { useRecoilState } from 'recoil';
import { allStoreInfoState } from '../../atoms/allStoreInfo';

import { Refresh } from 'tabler-icons-react';

function QueueTicket({ refreshFunc }:{ refreshFunc:Function }){

    const [ allStore ] = useRecoilState<any>(allStoreInfoState);

    return(
        <>
        
        <h2 style={{ margin:"0" }}>
          Queue ticket 
          <Refresh style={{ paddingTop:"9px"}} size={24} strokeWidth={2} color={'#4075bf'} onClick={ () => refreshFunc() }/>
        </h2>
        
        <div style={{ textAlign:"center"}}>
          <Grid>
            {allStore.data.singleStoreQueue.boothQueue.map( (v:string) => (
              <Grid.Col key={v} span={4}>
                <h1 style={{ margin:"0" }}>{v}</h1>
              </Grid.Col>
            ))}
          </Grid>
        </div>
    </>
    )

}

export default QueueTicket