import type { NextPage } from 'next';
import Head from 'next/head'

import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

import { Container } from '@mantine/core';
import { useStoreQueue } from '../hook/useStoreQueue';

import DashBoardStore from '../components/indexPage/dashBoardStore';
import GeneralInfo from "../components/indexPage/generalInfo"
import WaitInfo from '../components/indexPage/WaitInfo';
import QueueTicket from '../components/indexPage/QueueTicket';
import UserQueueInfo from '../components/indexPage/UserQueueInfo';
import ColorThemeBtn from '../components/indexPage/ColorThemeBtn';

import { allStoreInfoState } from '../atoms/allStoreInfo';
import styles from './pageCss.module.css'

import dynamic from 'next/dynamic'
const Clock = dynamic(() => import('react-live-clock'), { ssr: false })

const Home: NextPage = () => {

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [lastUpdateTime, setLastUpdateTime] = useState<string | null>(null);

    const [isLoading, isError, reCallFetch] = useStoreQueue(selectedId);
    const [allStore] = useRecoilState<any>(allStoreInfoState);

    useEffect(() => {
        setLastUpdateTime(new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_kong" }));
    }, [allStore])

    return (
        <>
            <Head>
                <title>Sushi call - Home</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Container size="xl" className={styles.textStyleLightBg}>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
                    <div>
                        {allStore && allStore.status && (
                            <>
                                <h2 style={{ margin: "0" }}> {allStore.data.allStoreData.name} ({allStore.data.allStoreData.storeStatus})</h2>
                                <h5 style={{ margin: "0" }}> Last Update: {lastUpdateTime}</h5>
                                <h5 style={{ margin: "0" }}>
                                    Current Time: <Clock format={'h:mm:ssa'} ticking={true} timezone={'Asia/Hong_Kong'} />
                                </h5>
                            </>
                        )}
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <DashBoardStore setSelectedText={setSelectedId} />
                        <div style={{ width: "10px" }}></div>
                        <ColorThemeBtn />
                    </div>
                </div>

                <hr />

                {selectedId && allStore && allStore.status ? (
                    <>
                        <GeneralInfo />
                        <br /><hr />
                        <QueueTicket refreshFunc={() => reCallFetch()} />
                        <br /><hr />
                        <UserQueueInfo />
                    </>)
                    : (<WaitInfo />)

                }

            </Container>
        </>
    );

};

export default Home;
