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
import TextField from '@mui/material/TextField';
import HttpIcon from '@mui/icons-material/Http';
import InputAdornment from '@mui/material/InputAdornment';


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
        <Typography variant='h2' gutterBottom>WebSockets in Action &nbsp; {connected && <ConnectWithoutContactIcon />}</Typography>
        <Typography variant='h6'>Step 1. Open Your Browser Dev Tools.</Typography>
        <Typography variant='h6'>Step 2. Head over to Network Tab.</Typography>
        <Typography variant='h6' gutterBottom>Step 3. (Optional) Clear the network requests.</Typography>
        <Divider />
        <br />
        <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Bitcoin Price" />
        {/* <Tab label="Bring Your Own API" /> */}
        </Tabs>
        <TabPanel value={value} index={0}>
        <Stack spacing={1}>
            <Paper>
            <Typography variant="body1" gutterBottom>
            </Typography>
            </Paper>
            <Paper>
            <Typography variant="body1" gutterBottom>Without WebSocket functionality, the client would need to poll the server regularly to retrieve updates.</Typography>                
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
                <Button variant="contained" sx={{backgroundColor: '#FFB20F', color: '#000'}} onClick={getBitcoinPrice}>Get <CurrencyBitcoinIcon />Price using HTTP API</Button>
            </Paper>
            <Divider />
            <Paper>
            <Typography variant="body1" gutterBottom>Using WebSockets enables seamless communication between the client and the server. This protocol establishes a persistent, full-duplex connection, allowing real-time data exchange without the overhead of repeated HTTP requests. This makes WebSockets particularly suitable for applications requiring live updates or continuous data streams, such as live price tracking or collaborative tools.</Typography>
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
               {!binanceConnected ? <Button variant="contained" sx={{backgroundColor: '#FFB20F', color: '#000'}} onClick={getBitcoinPriceWS}>Get <CurrencyBitcoinIcon /> Price Using WS</Button>
               : <Button variant="contained" color="warning" onClick={handleBinanceDisconnect}>Disconnect</Button> 
               }
            </Paper>
            
        </Stack>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <Stack spacing={2}>
            <Paper>
                <Typography variant="body1" gutterBottom>This example highlights the difference between HTTP API and WebSocket when fetching data, such as a random Chuck Norris joke or using your own API.
                    </Typography>
            </Paper>
                    <Paper>
                    Try Your API: Test both methods with your own API:
                    <TextField fullWidth slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <HttpIcon />
              </InputAdornment>
            ),
          },
        }}></TextField>
                    </Paper>
<Typography variant='body1' gutterBottom>

HTTP API: The client sends repeated requests to fetch updated data. This increases network overhead and introduces delays.

Use HTTP polling for regular updates.
Set up WebSocket for real-time updates.
Compare the two to observe how WebSockets reduce latency and overhead while delivering seamless real-time updates.</Typography>
                <p>{data}</p>
                
        
            <Paper 
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                }}
            >
        {!connected ? <Button variant="contained" color="primary" onClick={handleConnect}>Connect to WS</Button> : <Button variant="contained" color="secondary" onClick={handleDisconnect}>Disconnect</Button>}
        </Paper>
            <Paper>
                <Typography variant="body1" gutterBottom>WebSocket: Establishes a persistent connection, allowing the server to push updates (e.g., a new joke) in real-time without repeated requests.</Typography>

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
