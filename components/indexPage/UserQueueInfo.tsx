import { Grid, Group, Skeleton, Text } from '@mantine/core';
import { useEffect } from "react";

import { useRecoilState } from "recoil";
import { allStoreInfoState } from "../../atoms/allStoreInfo";
import { tickerCallBeforeState } from "../../atoms/tickerCallBefore";
import { tickerNumberState } from "../../atoms/tickerNumber";
import { RecivedRootData } from "../../interface/sushiInterface";

import FormDialog from "./FormDialog"
import useSound from 'use-sound';

function UserQueueInfo({ initLoading }: { initLoading: boolean }) {

    const [tickerNumber] = useRecoilState<number>(tickerNumberState);
    const [tickerCallBefore] = useRecoilState<number>(tickerCallBeforeState);
    const [allStore] = useRecoilState<RecivedRootData | null>(allStoreInfoState);

    const [play] = useSound('/sounds/rock.mp3');
    const data = allStore && allStore.data && allStore.data.singleStoreQueue ? allStore.data.singleStoreQueue.boothQueue : [-999];

    useEffect(() => {
        if (!data || data.length <= 2 || tickerNumber === -1) {
            return;
        }

        if (tickerCallBefore >= tickerNumber - (+data[0])) {
            console.log("Calling");
            play();
            !!window && window.navigator.vibrate([200, 100, 200]);
        }

    }, [data])

    if (initLoading) {
        return (
            <>
                <Skeleton height={25} radius="xl" width="16%" style={{ marginTop: "25px" }} />
            </>
        )
    }

    return (
        <>
            <Group>
                <Text fw={600} fz={20}>
                    🎟️ Your ticket
                </Text>
                {data && data.length >= 3 && <FormDialog />}
            </Group>

            {tickerNumber !== -1 && (

                <Grid style={{ textAlign: "center" }}>
                    <Grid.Col span={6}>
                        <Text fw={600} fz={60}>
                            {tickerNumber || ""}
                        </Text>
                        <Text fw={400} fz={16} c="dimmed" >
                            Your Ticket
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Text fw={600} fz={60}>
                            {tickerNumber - (+data[0]) || "N/A"}
                        </Text>
                        <Text fw={400} fz={16} c="dimmed">
                            Left Queue
                        </Text>
                    </Grid.Col>
                </Grid>
            )}
        </>
    )
}

export default UserQueueInfo