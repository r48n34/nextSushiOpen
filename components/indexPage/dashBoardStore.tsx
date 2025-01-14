import React, { Fragment } from 'react';
import useSWRImmutable from 'swr/immutable'
import { Menu, Button } from '@mantine/core';
import { BuildingStore } from 'tabler-icons-react';

import { useRecoilState } from 'recoil';
import { fetcher } from "../../utilis/swrFetcher"
import { callLoadingSwal } from '../../utilis/swalCall';
import { tickerNumberState } from '../../atoms/tickerNumber';

import { groupBy, prop } from "remeda"
import { AllStoreDataReduced } from '../../interface/sushiInterface';

const DashBoardStore = ({ setSelectedText }: { setSelectedText: Function }) => {

    const { data: singleQueue, error: errorSinglequeue } = useSWRImmutable<{ data: { status: boolean, allStoreData: AllStoreDataReduced[] } }>('/api/sushiCall?id=-1', fetcher);
    const [tickerNumber, setTickerNumber] = useRecoilState(tickerNumberState);

    const handleClose = (event: any, id: string | undefined = undefined) => {

        if (id && id !== "backdropClick") {
            callLoadingSwal();

            setSelectedText(id);
            setTickerNumber(-1);
        }

    };


    if (!singleQueue) {
        return (
            <></>
        )
    }
    console.log(groupBy(singleQueue.data.allStoreData, prop("region")));

    return (
        <>
            {!errorSinglequeue && (
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <Button type="button" size="xs" >Select Store</Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        {singleQueue
                            && singleQueue.data
                            && singleQueue.data.allStoreData
                            && Object.entries(groupBy(singleQueue.data.allStoreData, prop("region"))).map(v =>
                                <Fragment key={v[0]}>
                                    <Menu.Label>
                                        {v[0]}
                                    </Menu.Label>
                                    <Menu.Divider />
                                    {v[1].map(k =>
                                        <Menu.Item
                                            icon={<BuildingStore size={14} />}
                                            key={"store" + k.id}
                                            onClick={(event: any) => handleClose(event, k.id + "")}
                                        >
                                            {k.name}
                                        </Menu.Item>
                                    )}
                                </Fragment>
                            )
                            // && groupBy(singleQueue.data.allStoreData, prop("region"))
                            // && singleQueue.data.allStoreData.map((v: any) => (
                            //     <Menu.Item
                            //         icon={<BuildingStore size={14} />}
                            //         key={"store" + v.id}
                            //         onClick={(event: any) => handleClose(event, v.id)}>{v.name}
                            //     </Menu.Item>
                            // ))
                        }
                    </Menu.Dropdown>
                </Menu>
            )}

        </>
    )

}

export default React.memo(DashBoardStore)