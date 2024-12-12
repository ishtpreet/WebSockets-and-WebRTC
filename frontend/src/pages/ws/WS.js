import React, {useState} from 'react'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../../components/TabPanel';
import Typography from '@mui/material/Typography';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { Box, Paper } from '@mui/material';

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


    return (
        <Box sx={{ padding: 2 }}>
    <Paper elevation={3} sx={{ padding: 4, maxWidth: '1200px', margin: 'auto' }}>
        <Typography variant="h4" gutterBottom>
            📈 WebSocket In Action: Real-Time Bitcoin Price Tracker
        </Typography>
        <Typography variant="body1" gutterBottom>
            See how WebSockets enable live data updates without the need for repeated API calls, offering a more efficient and seamless communication experience.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Step Instructions */}
        <Typography variant="h6" gutterBottom>Step 1. Open Your Browser Dev Tools.</Typography>
        <Typography variant="h6" gutterBottom>Step 2. Head over to the Network Tab.</Typography>
        <Typography variant="h6" gutterBottom>Step 3. Clear the network requests. (Optional) </Typography>

        <Divider sx={{ my: 3 }} />

        <Tabs value={value} onChange={handleChange} centered style={{marginBottom: '1%'}}>
            <Tab label="Bitcoin Price" />
        </Tabs>

        <TabPanel value={value} index={0}>
            <Stack spacing={3}>
                <Box>
                    <Typography variant="h5" gutterBottom>
                        Why Use WebSockets for Real-Time Updates?
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Without WebSockets, the client must continuously poll the server to fetch updated data, introducing latency and network overhead. WebSockets enable a persistent, full-duplex connection, making them ideal for live data applications.
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="h5" gutterBottom>
                        Fetching Bitcoin Price
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Use the buttons below to fetch the Bitcoin price using either HTTP API or WebSocket.
                    </Typography>
                </Box>

                {showPrice && (
                    <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
                        <Typography variant="h6">Bitcoin Price: ${price}</Typography>
                    </Paper>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#FFB20F', color: '#000' }}
                        onClick={getBitcoinPrice}
                        startIcon={<CurrencyBitcoinIcon />}
                    >
                        Get Price Using HTTP API
                    </Button>
                    {!binanceConnected ? (
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#FFB20F', color: '#000' }}
                            onClick={getBitcoinPriceWS}
                            startIcon={<CurrencyBitcoinIcon />}
                        >
                            Get Price Using WebSocket
                        </Button>
                    ) : (
                        <Button variant="contained" color="warning" onClick={handleBinanceDisconnect}>
                            Disconnect
                        </Button>
                    )}
                </Box>

                {showPriceWS && (
                    <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
                        <Typography variant="h6">Bitcoin Price: ${priceWS}</Typography>
                    </Paper>
                )}
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
    </Paper>
</Box>

    )
}
