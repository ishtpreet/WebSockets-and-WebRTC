import React, {useState} from 'react'
import Button from '@mui/material/Button';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function WS() {

    const [ws, setWs] = useState(null);
    const [msg, setMsg] = useState('');
    const [connected, setConnected] = useState(false);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState('');
    const [alertType, setAlertType] = useState('success');
    const [duration, setDuration] = useState(5000);

    const handleConnect = (e) => {
        e.preventDefault();
        const ws = new WebSocket(process.env.REACT_APP_WS_URI);
        setWs(ws);
        ws.onopen = () => {
          console.log('WebSocket connected');
          setMsg('Connected to WebSocket');
        setOpen(true);
          setConnected(true);
        };
        ws.onmessage = (message) => {
          console.log('Received:', message.data);
          setData(message.data);
          setDuration(2000);
          setMsg('Received data from WS server');
          setAlertType('info');
          setOpen(true);
        };
      };

    const handleDisconnect = (e) => {
        e.preventDefault();
        if (ws) {
          ws.close();
        }
        
        setMsg('Disconnected from WebSocket');
        setDuration(5000)
        setAlertType('warning');
        setOpen(true);
        setConnected(false);
      };

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      }

      

    return (<>
        <h1>WebSocket & WebRTC &nbsp; {connected && <ConnectWithoutContactIcon />}</h1>
        <p>{data}</p>
        
       {!connected ? <Button variant="contained" color="primary" onClick={handleConnect}>Connect to WS</Button> : <Button variant="contained" color="secondary" onClick={handleDisconnect}>Disconnect</Button>}
       <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertType}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {msg}
          </Alert>
        </Snackbar>
    </>)
}
