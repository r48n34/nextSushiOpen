import { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useRecoilState } from 'recoil';
import { tickerCallBeforeState } from '../../atoms/tickerCallBefore';
import { tickerNumberState } from '../../atoms/tickerNumber';

export default function FormDialog() {
  const [ open, setOpen ] = useState(false);

  // tickerNumber, tickerCallBefore
  const [ tempValue, setTempValue ] = useState<number[]>([-1,15]);

  const [ tickerNumber, setTickerNumber ] = useRecoilState(tickerNumberState);
  const [ tickerCallBefore, setTickerCallBefore ] = useRecoilState(tickerCallBeforeState);

  function inputTicketHandler(){

    console.log(tempValue);

    if(!tempValue[0] || !tempValue[1]){
        return;
    }

    if(typeof tempValue[0] !== "number" || typeof tempValue[0] !== "number" || tempValue[0] < 0 || tempValue[1] < 0){
        return;
    }

    setTickerNumber(tempValue[0]);
    setTickerCallBefore(tempValue[1]);
    setOpen(false);
  }

  return (
    <div>

      <Button variant="outlined" onClick={() => setOpen(true)}>
        Enter ticket
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Queue Ticket</DialogTitle>

        <DialogContent>

            <DialogContentText>
                Enter your ticket no here.
            </DialogContentText>
            <br/>
            <TextField
                margin="dense"
                label="Ticket no"
                type="number"
                fullWidth
                onChange={ (e) => setTempValue([ +e.currentTarget.value, tempValue[1] ])}
                InputLabelProps={{ shrink: true, }}
            />

            <TextField
                margin="dense"
                label="Notices when before"
                type="number"
                fullWidth
                defaultValue={tickerCallBefore}
                onChange={ (e) => setTempValue([tempValue[0], +e.currentTarget.value])}
                InputLabelProps={{ shrink: true, }}
            />

        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => inputTicketHandler()}>Enter</Button>
        </DialogActions>

      </Dialog>
    </div>
  );
}