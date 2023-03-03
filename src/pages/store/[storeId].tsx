import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Container } from "@nextui-org/react";

function StoreInfo(){

    const router = useRouter()
    const { storeId } = router.query

    useEffect(() => {
        ( async () => {
            if(!storeId){
                return 
            }
    
            const callApiPath = `/api/sushiCall?id=${storeId}&method=QueueAndWaitTime`;
            let data = await axios.get(callApiPath);
    
            console.log(data.data);
        })()
    }, [storeId])
    

    return (
        <Container>
            <h1>Hello { storeId }</h1>
        </Container>
    )
}
    
export default StoreInfo
