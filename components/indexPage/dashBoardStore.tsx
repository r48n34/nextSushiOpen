import React, { Fragment } from 'react';
import useSWRImmutable from 'swr/immutable'
import { Menu, Button, Select } from '@mantine/core';
import { BuildingStore } from 'tabler-icons-react';

import { useRecoilState } from 'recoil';
import { fetcher } from "../../utilis/swrFetcher"
import { callLoadingSwal } from '../../utilis/swalCall';
import { tickerNumberState } from '../../atoms/tickerNumber';

import { groupBy, prop } from "remeda"
import { AllStoreDataReduced } from '../../interface/sushiInterface';
import { useDisclosure } from '@mantine/hooks';

const DashBoardStore = ({ setSelectedText }: { setSelectedText: Function }) => {

    const { data: singleQueue, error: errorSinglequeue } = useSWRImmutable<{ data: { status: boolean, allStoreData: AllStoreDataReduced[] } }>('/api/sushiCall?id=-1', fetcher);
    const [tickerNumber, setTickerNumber] = useRecoilState(tickerNumberState);

    const [dropdownOpened, { close, open }] = useDisclosure();

    const handleClose = (id: string | null = null) => {
        callLoadingSwal();
        setSelectedText(id);
        setTickerNumber(-1);
        close();
    };

    return (
        <>

            <Select
                searchable
                placeholder="Select Store"
                disabled={!singleQueue}
                data={singleQueue && singleQueue.data ? Object.entries(groupBy(singleQueue!.data.allStoreData, prop("region")))
                    .map(v => ({
                        group: v[0], items: v[1].map(k => ({
                            label: k.name,
                            value: k.id+"",
                        }))
                    }))
                    : []
                }
                onClick={open}
                dropdownOpened={dropdownOpened}
                onChange={ (id: string | null) => handleClose(id)}
            />

            {/* <Menu shadow="md" width={200}>
                <Menu.Target>
                    <Button size="xs" loading={!singleQueue}>
                        Select Store
                    </Button>
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
                                        onClick={() => handleClose(k.id + "")}
                                    >
                                        {k.name}
                                    </Menu.Item>
                                )}
                            </Fragment>
                        )
                    }
                </Menu.Dropdown>
            </Menu> */}
        </>
    )

}

export default React.memo(DashBoardStore)