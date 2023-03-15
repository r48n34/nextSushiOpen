import { UnstyledButton, Container, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import { useState } from 'react';
    
function RedirectNewAppHeader(){

    const [ isClose, setIsClose ] = useState<boolean>(false);

    return (
        <Container fluid mt={16}>
        { !isClose 
        ? (<Alert 
            icon={<IconAlertCircle size={16} />}
            title="New Interface"
            color="gray"
            variant="filled"
            withCloseButton
            onClose={ () => setIsClose(true)}
        >
            We have the new design from  
            <UnstyledButton ml={4}
                onClick={() => !!window && window.open("https://nuxt-sushi.vercel.app/", '_blank')}
            > 
              {" "}https://nuxt-sushi.vercel.app/ 
            </UnstyledButton>
            . Please check out out new interface. Faster, Stronger and lighter.
        </Alert>)
        : (<></>)
        }
        </Container>
    )
}
    
export default RedirectNewAppHeader
