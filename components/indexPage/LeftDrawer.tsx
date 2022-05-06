import { useState } from 'react';
import { Drawer, Button, Group } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import ColorThemeBtn from './ColorThemeBtn';
import { BrandGithub } from 'tabler-icons-react';

function LeftDrawer() {
  const [opened, setOpened] = useState<boolean>(false);

  useHotkeys([
    ['ctrl+S', () => setOpened(!opened)],
  ]);

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

        <div style={{display:"flex", alignItems:"center"}}>
          <h3>Color mode</h3>
          <div style={{ width:"6px" }}> </div>
          <ColorThemeBtn/>
        </div>

        <div style={{ height:"88%", display:"flex", alignItems:"end"}}>
          <div>
          <hr/>
          <BrandGithub onClick={() => location.href = "https://github.com/r48n34/nextSushiOpen"}/>
          </div>
        </div>
        
      </Drawer>
    </>
  );
}

export default LeftDrawer