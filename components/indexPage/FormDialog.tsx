import { useState } from 'react';
import { Tooltip, UnstyledButton, Dialog, Group, Button, Text, NumberInput } from '@mantine/core';
// import { showNotification } from '@mantine/notifications';

import { useRecoilState } from 'recoil';
import { tickerCallBeforeState } from '../../atoms/tickerCallBefore';
import { tickerNumberState } from '../../atoms/tickerNumber';
import { Ticket } from 'tabler-icons-react';

function FormDialog() {
    const [open, setOpen] = useState(false);

    // tickerNumber, tickerCallBefore
    const [tempValue, setTempValue] = useState<number[]>([0, 15]);

    const [tickerNumber, setTickerNumber] = useRecoilState(tickerNumberState);
    const [tickerCallBefore, setTickerCallBefore] = useRecoilState(tickerCallBeforeState);

    function inputTicketHandler() {

        console.log(tempValue);

        if (!tempValue[0] || !tempValue[1]) {
            return;
        }

        if (typeof tempValue[0] !== "number" || typeof tempValue[0] !== "number" || tempValue[0] < 0 || tempValue[1] < 0) {
            return;
        }

        // showNotification({
        //     title: 'Success',
        //     message: 'Your ticket is added to notifications.',
        // })

        setTickerNumber(tempValue[0]);
        setTickerCallBefore(tempValue[1]);
        setOpen(false);
    }

    return (
        <>
            <div style={{ marginTop: "9px" }}>
                <Tooltip label="Enter Ticket" withArrow>
                    <UnstyledButton onClick={() => setOpen((v) => !v)}> <Ticket /> </UnstyledButton>
                </Tooltip>
            </div>

            <Dialog
                opened={open}
                withCloseButton
                onClose={() => setOpen(false)}
                size="md"
                radius="md"
            >
                <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
                    Enter your ticket number to get notifications.
                </Text>

                <Group align="flex-end">
                    <NumberInput
                        min={0}
                        label="Your ticket"
                        defaultValue={tempValue[0]}
                        onChange={(val: string | number) => setTempValue([+val, tempValue[1]])}
                    />
                    <NumberInput
                        min={0}
                        label="Before call"
                        defaultValue={tempValue[1]}
                        onChange={(val: string | number) => setTempValue([tempValue[0], +val])}
                    />
                </Group>

                <br />
                <Button onClick={() => inputTicketHandler()}>Enter</Button>
            </Dialog>
        </>
    );
}

export default FormDialog