import { useRecoilState } from "recoil";
import { allStoreInfoState } from "../../atoms/allStoreInfo";
import { Skeleton, Grid, Group } from '@mantine/core';


const GeneralInfo = ({ initLoading }:{ initLoading:boolean }) => {

    const [ allStore ] = useRecoilState<any>(allStoreInfoState);

    if(initLoading){
        return(
            <>
            <Skeleton height={25} radius="xl" width="16%" style={{ marginTop: "25px"}} />

            <Grid>
                <Grid.Col span={6}>
                    <Group position="center">
                        <Skeleton height={100} circle />
                    </Group>

                    <Group position="center">
                        <Skeleton height={20} radius="xl" width="16%" style={{ marginTop: "5px"}} />
                    </Group>
                </Grid.Col>

                <Grid.Col span={6}>
                    <Group position="center">
                        <Skeleton height={100} circle />
                    </Group>

                    <Group position="center">
                        <Skeleton height={20} radius="xl" width="16%" style={{ marginTop: "5px"}} />
                    </Group>
                </Grid.Col>

            </Grid>
            </>
        )
    }

    return(
        <>
        <h2>General Info</h2>

        <div style={{display:"flex" , justifyContent:'space-around'}}>
          <div style={{ textAlign:"center" }}>
              <h1 style={{ margin:"0", fontSize:"4rem" }}>{allStore.data.allStoreData.wait || "N/A"}</h1>
              <h3 style={{ margin:"0" }}>Minutes</h3>
          </div>
          <div style={{ textAlign:"center" }}>
              <h1 style={{margin:"0", fontSize:"4rem"}}>{allStore.data.allStoreData.waitingGroup || "N/A"}</h1>
              <h3 style={{margin:"0"}}>Queue</h3>
          </div>
        </div>
        </>
    )

}

export default GeneralInfo
