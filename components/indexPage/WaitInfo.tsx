import { Box, Text } from '@mantine/core'
import dynamic from 'next/dynamic'
const Clock = dynamic( () => import('react-live-clock'), { ssr: false })

const WaitInfo: any = () => {

    return (
        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
            <Box style={{ textAlign: "center" }}>

                <Text ta="center" fw={600} fz={36}>
                    Select stores
                </Text>

                <Text ta="center" fw={400} c="dimmed" fz={14} mb={4}>
                    Click the "Select stores" in the right top conor.
                </Text>
    
                <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Hong_Kong'} />
             
            </Box>
        </Box>
    )
}

export default WaitInfo
