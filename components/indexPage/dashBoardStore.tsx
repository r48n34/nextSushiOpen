import { Menu, Button } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import useSWRImmutable from 'swr/immutable'
import { BuildingStore } from 'tabler-icons-react';

import { useRecoilState } from 'recoil';
import { tickerNumberState } from '../../atoms/tickerNumber';
import { fetcher } from "../../utilis/swrFetcher"
import React from 'react';
import { callLoadingSwal } from '../../utilis/swalCall';

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
            <>
            <Menu control={<Button type="button" size="xs" color={colorScheme} >Select Store</Button>}>
                <Menu.Label>Store</Menu.Label>
                {singleQueue && singleQueue.data && singleQueue.data.allStoreData && singleQueue.data.allStoreData.map( (v:any) => (
                        <Menu.Item icon={<BuildingStore size={14}/>} key={"store" + v.id} onClick={ (event:any) => handleClose(event, v.id)}>{v.name}</Menu.Item>
                    ))}
                {!singleQueue && (<Menu.Item onClick={ (event:any) => handleClose(event, undefined)}>Loading...</Menu.Item>)}

            </Menu>
            </>
        )}
      </div>
    );
    

}

export default React.memo(DashBoardStore)