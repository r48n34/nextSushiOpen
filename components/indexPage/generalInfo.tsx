import { useRecoilState } from "recoil";
import { allStoreInfoState } from "../../atoms/allStoreInfo";
import { Skeleton, Grid, Group, Text, Box } from '@mantine/core';


const GeneralInfo = ({ initLoading }: { initLoading: boolean }) => {

    const [allStore] = useRecoilState<any>(allStoreInfoState);

    if (initLoading) {
        return (
            <>
                <Skeleton height={25} radius="xl" width="16%" style={{ marginTop: "25px" }} />

                <Grid>
                    <Grid.Col span={6}>
                        <Group justify="center">
                            <Skeleton height={100} circle />
                        </Group>

                        <Group justify="center">
                            <Skeleton height={20} radius="xl" width="16%" style={{ marginTop: "5px" }} />
                        </Group>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Group justify="center">
                            <Skeleton height={100} circle />
                        </Group>

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
                📚 General Info
            </Text>

            <Box style={{ display: "flex", justifyContent: 'space-around' }}>

                <Box style={{ textAlign: "center" }}>
                    <Text fw={600} fz={60}>
                        {allStore.data.allStoreData.wait || "N/A"}
                    </Text>

                    <Text fw={400} fz={16} c="dimmed">
                        Est Wait Minutes
                    </Text>
                </Box>

                <Box style={{ textAlign: "center" }}>

                    <Text fw={600} fz={60}>
                        {allStore.data.allStoreData.waitingGroup || "N/A"}
                    </Text>

                    <Text fw={400} fz={16} c="dimmed">
                        Queue
                    </Text>
                </Box>
                
            </Box>
        </>
    )

}

export default GeneralInfo
