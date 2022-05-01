import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';

import Container from '@mui/material/Container';
import { useStoreQueue } from '../hook/useStoreQueue';

import DashBoardStore from '../components/indexPage/dashBoardStore';
import GeneralInfo from "../components/indexPage/generalInfo"
import WaitInfo from '../components/indexPage/WaitInfo';
import QueueTicket from '../components/indexPage/QueueTicket';
import UserQueueInfo from '../components/indexPage/UserQueueInfo';

import styles from './pageCss.module.css'
import { useRecoilState } from 'recoil';
import { allStoreInfoState } from '../atoms/allStoreInfo';
import ColorThemeBtn from '../components/indexPage/ColorThemeBtn';

const Home: NextPage = () => {

  const [ selectedId, setSelectedId ] = useState<string | null>(null);
  const [ lastUpdateTime, setLastUpdateTime ] = useState<string | null>(null);

  const [ isLoading, isError, reCallFetch ] = useStoreQueue(selectedId);

  const [ allStore, setAllStore ] = useRecoilState<any>(allStoreInfoState);

  useEffect(() => {
    setLastUpdateTime( new Date().toLocaleString("en-US", {timeZone: "Asia/Hong_kong"}) );
  },[allStore])

  useEffect(() =>{
    document.title = "Sushi call - Home";
  },[])

  return (
    <Container maxWidth="xl" className={styles.textStyleLightBg}>

      <div style={{ display: "flex", justifyContent:"space-between", marginTop: "1.5rem" }}>
        <div>
          {allStore && allStore.status && (
            <>
              <h2 style={{ margin: "0" }}> {allStore.data.allStoreData.name}</h2>
              <h5 style={{ margin: "0" }}> Last Update: {lastUpdateTime}</h5>
            </>
          )}
        </div>

        <div style={{ display:"flex", justifyContent:"center", alignItems:"center"}}>
          <DashBoardStore setSelectedText={setSelectedId}/>
          <ColorThemeBtn/>
        </div>  
      </div>

      <hr/>
      
      {selectedId && allStore && allStore.status ? (
      <>
        <GeneralInfo/>
        <br/><hr/>
        <QueueTicket refreshFunc={ () => reCallFetch() } />
        <br/><hr/>
        <UserQueueInfo/>
      </>)
      :( <WaitInfo/> )
      
    }

    </Container>
  );

};

export default Home;
