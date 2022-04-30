import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import useSWRImmutable from 'swr/immutable'

import { useRecoilState } from 'recoil';
import { tickerNumberState } from '../../atoms/tickerNumber';
import { fetcher } from "../../utilis/swrFetcher"
import React from 'react';
import { callLoadingSwal } from '../../utilis/swalCall';

const DashBoardStore: any = ({ setSelectedText }:{ setSelectedText:Function }) => {

    const { data: singleQueue, error:errorSinglequeue } = useSWRImmutable('/api/sushiCall?id=-1', fetcher);
    
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [ isOpenBoard, setIsOpenBoard ] = useState<boolean>(false);

    const [ tickerNumber, setTickerNumber ] = useRecoilState(tickerNumberState);

    const handleClick = (event:any) => { 
        setAnchorEl(event.currentTarget);
        setIsOpenBoard(true)
    };

    const handleClose = ( event:any, id:string | undefined = undefined ) => {

        if(id && id !== "backdropClick"){
            //console.log(id)
            callLoadingSwal();

            setSelectedText(id);
            setTickerNumber(-1);
        }

        setIsOpenBoard(false);
    };
  
    return (
      <div>
        { !errorSinglequeue && (
            <>
            <Button
            aria-controls="demo-positioned-menu"
            aria-haspopup="true"
            aria-expanded={isOpenBoard ? 'true' : undefined}
            onClick={handleClick}
            >
            Select store
            </Button>
            <Menu
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={isOpenBoard}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'left'}}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                {singleQueue && singleQueue.data && singleQueue.data.allStoreData && singleQueue.data.allStoreData.map( (v:any) => (
                    <MenuItem key={"store" + v.id} onClick={ (event:any) => handleClose(event, v.id)}>{v.name}</MenuItem>
                ))}
                {!singleQueue && (<MenuItem onClick={ (event:any) => handleClose(event, undefined)}>Loading...</MenuItem>)}
            </Menu>
            </>
        )}
      </div>
    );
    

}

export default React.memo(DashBoardStore)