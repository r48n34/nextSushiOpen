import { Tooltip, UnstyledButton, Grid, Skeleton, Group, Space, Text, Box } from '@mantine/core';

import { useRecoilState } from 'recoil';
import { allStoreInfoState } from '../../atoms/allStoreInfo';

import { Refresh } from 'tabler-icons-react';

function QueueTicket({ refreshFunc, initLoading }: { refreshFunc: Function, initLoading: boolean }) {

    const [allStore] = useRecoilState<any>(allStoreInfoState);

    if (!allStore || !allStore.data || !allStore.data.singleStoreQueue || initLoading) {
        return (
            <>
                <Skeleton height={25} radius="xl" width="16%" style={{ marginTop: "25px" }} />
                <Space h="xl" />
                <Grid>
                    <Grid.Col span={4}>
                        <Group justify="center">
                            <Skeleton height={20} radius="xl" width="16%" style={{ marginTop: "5px" }} />
                        </Group>
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <Group justify="center">
                            <Skeleton height={20} radius="xl" width="16%" style={{ marginTop: "5px" }} />
                        </Group>
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <Group justify="center">
                            <Skeleton height={20} radius="xl" width="16%" style={{ marginTop: "5px" }} />
                        </Group>
                    </Grid.Col>
                </Grid>
            </>
        )
    }

    return (
        <>
            <Text fw={600} fz={20}>
                🎢 Queue ticket

                <Tooltip label="Refresh status" withArrow>
                    <UnstyledButton onClick={() => refreshFunc()}>
                        <Refresh style={{ paddingTop: "9px" }} size={24} strokeWidth={2} />
                    </UnstyledButton>
                </Tooltip>
            </Text>

            <Box style={{ textAlign: "center" }} mt={12}>
                <Grid>
                    {allStore.data.singleStoreQueue.boothQueue.map((v: string) => (
                        <Grid.Col key={v} span={4}>
                            <Text fz={40} fw={500}>
                                {v}
                            </Text>
                        </Grid.Col>
                    ))}
                </Grid>
            </Box>
        </>
    )

}

export default QueueTicket