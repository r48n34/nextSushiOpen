import React from 'react';
import useSWRImmutable from 'swr/immutable'
import { Menu, Button } from '@mantine/core';
import { BuildingStore } from 'tabler-icons-react';
import { useMantineColorScheme } from '@mantine/core';

import { useRecoilState } from 'recoil';
import { fetcher } from "../../utilis/swrFetcher"
import { callLoadingSwal } from '../../utilis/swalCall';
import { tickerNumberState } from '../../atoms/tickerNumber';

import LeftDrawer from './LeftDrawer';

const DashBoardStore: any = ({ setSelectedText }:{ setSelectedText:Function }) => {

    const { data: singleQueue, error:errorSinglequeue } = useSWRImmutable('/api/sushiCall?id=-1', fetcher);
    const [ tickerNumber, setTickerNumber ] = useRecoilState(tickerNumberState);

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const handleClose = ( event:any, id:string | undefined = undefined ) => {

        if(id && id !== "backdropClick"){
            callLoadingSwal();

            setSelectedText(id);
            setTickerNumber(-1);
        }
        
    };
  
    return (
      <div>
        { !errorSinglequeue && (
            <div style={{ display: "flex", alignItems:"center"}}>

            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <Button type="button" size="xs" color={colorScheme == 'dark' ? 'white' : 'dark'} >Select Store</Button>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>Store</Menu.Label>
                    {singleQueue && singleQueue.data && singleQueue.data.allStoreData && singleQueue.data.allStoreData.map( (v:any) => (
                        <Menu.Item 
                            icon={<BuildingStore size={14}/>} 
                            key={"store" + v.id} 
                            onClick={ (event:any) => handleClose(event, v.id)}>{v.name}
                        </Menu.Item>
                    ))}
                    {!singleQueue && (<Menu.Item onClick={ (event:any) => handleClose(event, undefined)}>Loading...</Menu.Item>)}
                </Menu.Dropdown>
            </Menu>

            <div style={{ width:"5px" }}></div>
                <LeftDrawer singleQueue={singleQueue}/>
            </div>
        )}

      </div>
    );
    
}

export default React.memo(DashBoardStore)