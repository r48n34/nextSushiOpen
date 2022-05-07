import { useEffect, useState } from 'react';

import { Drawer, Button, ScrollArea, MultiSelect, useMantineColorScheme } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';

import MapModal from './MapModal';

function LeftDrawer({ singleQueue }:any) {
  const [ opened, setOpened ] = useState<boolean>(false);
  const [ filtedRegion, setFiltedRegion ] = useState<string[]>([]);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();


  const allRegion:string[] = (singleQueue && Array.from( new Set( singleQueue.data.allStoreData.map((v:any) => v.region)) )) || [];

  useHotkeys([
    ['ctrl+S', () => setOpened(!opened)],
  ]);
  useEffect( () => {
    console.log(filtedRegion);
  },[filtedRegion])

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Sushi call"
        padding="xl"
        size="xl"
        transition="slide-right"
        transitionDuration={450}
        transitionTimingFunction="ease"
      >

        <h2>Store location:</h2>
        <MultiSelect
          data={allRegion}
          label="Regions"
          placeholder="Pick the regions"
          onChange={setFiltedRegion}
        />

        <ScrollArea style={{ height: 450 }}>
          {singleQueue && 
          singleQueue.data && 
          singleQueue.data.allStoreData && 
          singleQueue.data.allStoreData.filter( (v:any) => filtedRegion.indexOf(v.region) >= 0)
          .map( (v:any) => (
            <div key={"store" + v.id}>
              <h4 style={{ margin:"0", marginTop: "5px" }}>{v.name}</h4>
              <h5 style={{ margin:"0", marginBottom: "5px" }}>{v.address}</h5>
              <MapModal storeLocation={v.position} storePlaceString={v.address}/>
            </div>
          ))}
        </ScrollArea>

      </Drawer>

      <Button size="xs" color={colorScheme} onClick={() => setOpened(true)}>Info</Button>

    </>
  );
}

export default LeftDrawer