// import React from "react"
import { Map, Marker } from "pigeon-maps"
import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import { copyToClipboard } from '../../utilis/copyText';
import { showNotification } from '@mantine/notifications';

function MapModal({ storeLocation, storePlaceString }: { storeLocation:[number, number], storePlaceString:string }) {
  const [ opened, setOpened ] = useState<boolean>(false);
  const [ locationPol, setLocationPol ] = useState<[number, number]>(storeLocation || [50.879, 4.6997]);

  function clickHandler(){
    copyToClipboard(storePlaceString);

    showNotification({
        title: 'OK',
        message: 'Copied location to clipboard.',
    })
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Location"
      >
          <div style={{ height: "500px" }}>
            <Map defaultCenter={locationPol} defaultZoom={16}>
                <Marker width={30} anchor={locationPol} onClick={ () => clickHandler() } />
            </Map>
          </div>
      </Modal>

      <Group position="left">
        <Button onClick={() => setOpened(true)}>Open Map</Button>
      </Group>
    </>
  );
}

export default MapModal