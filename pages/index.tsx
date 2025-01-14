import type { NextPage } from 'next';
import Head from 'next/head'

import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

import { Container, Divider, Group, Text } from '@mantine/core';
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
import { RecivedRootData } from '../interface/sushiInterface';
// import RedirectNewAppHeader from '../components/indexPage/RedirectNewAppHeader';
const Clock = dynamic(() => import('react-live-clock'), { ssr: false })

const Home: NextPage = () => {

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [lastUpdateTime, setLastUpdateTime] = useState<string | null>(null);

    const [isLoading, isError, reCallFetch, initLoading] = useStoreQueue(selectedId);
    const [allStore] = useRecoilState<RecivedRootData | null>(allStoreInfoState);

    useEffect(() => {
        setLastUpdateTime(new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_kong" }));
    }, [allStore])

    return (
        <>
            <Head>
                <title>Home | Sushi call</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Container size="xl" className={styles.textStyleLightBg}>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
                    <div>
                        {allStore && allStore.status && (
                            <>
                                <Text style={{ margin: "0" }}>
                                    {allStore.data.allStoreData.name} ({allStore.data.allStoreData.storeStatus})
                                </Text>

                                <Text c="dimmed" fz={12}>
                                    Last Update:
                                </Text>
                                <Text fz={10}> 
                                    {lastUpdateTime}
                                </Text>

                                <Text c="dimmed" fz={12} mt={4}>
                                    Current Time:
                                </Text>
                                <Text fz={10}>
                                    <Clock format={'h:mm:ssa'} ticking={true} timezone={'Asia/Hong_Kong'} />
                                </Text>
                            </>
                        )}
                    </div>

                    <Group justify='flex-end'>
                        <DashBoardStore setSelectedText={setSelectedId} />
                        <ColorThemeBtn />
                    </Group>

                </div>

                <Divider my="md" />

                {selectedId ? (
                    <>
                        <GeneralInfo initLoading={initLoading} />
                        <br /><hr />
                        <QueueTicket initLoading={initLoading} refreshFunc={() => reCallFetch()} />
                        <br /><hr />
                        <UserQueueInfo initLoading={initLoading} />
                    </>)
                    : (
                        <WaitInfo />
                    )

                }

            </Container>
        </>
    );

};

export default Home;
