import React, {useState} from 'react'
import Button from '@mui/material/Button';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../../components/TabPanel';
import Typography from '@mui/material/Typography';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

export default function WS() {

    const [ws, setWs] = useState(null);
    const [binanceWs, setBinanceWs] = useState(null);
    const [binanceConnected, setBinanceConnected] = useState(false);
    const [msg, setMsg] = useState('');
    const [connected, setConnected] = useState(false);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState('');
    const [alertType, setAlertType] = useState('success');
    const [duration, setDuration] = useState(5000);
    const [value, setValue] = useState(0);
    const [price, setPrice] = useState(0);
    const [priceWS, setPriceWS] = useState(0);
    const [showPrice, setShowPrice] = useState(false);
    const [showPriceWS, setShowPriceWS] = useState(false);


    const handleChange = (event, newValue) => {
        setValue(newValue);
      }

    const handleConnect = (e) => {
        e.preventDefault();
        const ws = new WebSocket(`${process.env.REACT_APP_WS_URI}/websocket`);
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

      const getBitcoinPrice = async () => {
        setShowPrice(true);
        const response = await fetch('https://data-api.binance.vision/api/v3/ticker/price?symbol=BTCUSDT');
        const data = await response.json();
        setPrice(data.price);
      }

      const getBitcoinPriceWS = async () => {
        setShowPriceWS(true);
        const ws = new WebSocket('wss://data-stream.binance.vision:443/ws/btcusdt@kline_1s');
        setBinanceWs(ws);
        ws.onopen = () => {
          console.log('Binance WebSocket connected');
          setMsg('Connected to Binance WebSocket');
          setOpen(true);
          setBinanceConnected(true);
        };
        ws.onmessage = async (message) => {
          console.log('Received:', message.data);
        //   setData(message.data);
        const msg = await JSON.parse(message.data);
        console.log('Price:', msg.k.c, msg.k);
          setPriceWS(msg.k.c);
          setDuration(2000);
          setMsg('Received data from Binance WS server');
          setAlertType('info');
          setOpen(true);
        };
        }

        const handleBinanceDisconnect = (e) => {
            e.preventDefault();
            if (binanceWs) {
              binanceWs.close();
            }
            
            setMsg('Disconnected from Binance WebSocket');
            setDuration(5000)
            setAlertType('warning');
            setOpen(true);
            setBinanceConnected(false);
          }


    return (<>
        <h1>WebSockets in Action &nbsp; {connected && <ConnectWithoutContactIcon />}</h1>
        <h4>Step 1. Open Your Browser Dev Tools.</h4>
        <h4>Step 2. Head over to Network Tab.</h4>
        <h4>Step 3. (Optional) Clear the network requests.</h4>
        <Divider />
        <br />
        <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Bitcoin Price" />
        <Tab label="Random Chuck Norris Joke" />
        </Tabs>
        <TabPanel value={value} index={0}>
        <Stack spacing={1}>
            <Paper>
            <Typography variant="h6" gutterBottom>Without Using WebSocket, the client would have to poll the server for updates.</Typography>                
            </Paper>
            {showPrice && <Paper sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                <h3>Bitcoin Price: ${price}</h3>
            </Paper>}
            <Paper 
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}
            >
                <Button variant="contained" sx={{backgroundColor: '#FFB20F', color: '#000'}} onClick={getBitcoinPrice}><CurrencyBitcoinIcon />HTTP API</Button>
            </Paper>
            <Divider />
            <Paper>
            <Typography variant="h6" gutterBottom>Using WebSockets to communicate between the client and the server.</Typography>
            </Paper>
            {showPriceWS && <Paper sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                <h3>Bitcoin Price: ${priceWS}</h3>
            </Paper>}
            <Paper 
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}
            >
                {/* FFEC51, F7931A */}
               {!binanceConnected ? <Button variant="contained" sx={{backgroundColor: '#FFB20F', color: '#000'}} onClick={getBitcoinPriceWS}><CurrencyBitcoinIcon />WS</Button>
               : <Button variant="contained" color="warning" onClick={handleBinanceDisconnect}>Disconnect</Button> 
               }
            </Paper>
            
        </Stack>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <Stack spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
            <Paper>
                <Typography variant="h6" gutterBottom>Using WebSockets to communicate between the client and the server.</Typography>
                <p>{data}</p>
        
        {!connected ? <Button variant="contained" color="primary" onClick={handleConnect}>Connect to WS</Button> : <Button variant="contained" color="secondary" onClick={handleDisconnect}>Disconnect</Button>}
            </Paper>
            <Paper>
                <Typography variant="h6" gutterBottom>Without Using WebSocket, the client would have to poll the server for updates.</Typography>

            </Paper>
            
        </Stack>
        </TabPanel>

        
       
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
