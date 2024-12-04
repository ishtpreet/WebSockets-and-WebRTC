import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import {Routes, Route} from 'react-router';

import WebRTC from './components/WebRTC';
import SideMenu from './components/SideMenu';
import './App.css';
import NavBar from './components/NavBar';
import Home from './Home';

function App() {
  const [ws, setWs] = useState(null);
  const [msg, setMsg] = useState('');
  const [connected, setConnected] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  const handleConnect = (e) => {
    e.preventDefault();
    const ws = new WebSocket('ws://localhost:3001');
    setWs(ws);
    ws.onopen = () => {
      console.log('WebSocket connected');
      setMsg('Connected to WebSocket');
      setConnected(true);
    };
    ws.onmessage = (message) => {
      console.log('Received:', message.data);
      setMsg(message.data);
    };
  };
  const WS =() =>{
    return (<>
      <h1>WebSocket & WebRTC &nbsp; {connected && <ConnectWithoutContactIcon />}</h1>
      <p>{msg}</p>
      
     {!connected ? <Button variant="contained" color="primary" onClick={handleConnect}>Connect to WS</Button> : <Button variant="contained" color="secondary" onClick={handleDisconnect}>Disconnect</Button>}
  </>)
  }

    
    // const handleConnect = (e) => {
    //   e.preventDefault();
    //   const ws = new WebSocket('ws://localhost:3001');
    //   setWs(ws);
    //   ws.onopen = () => {
    //     console.log('connected');
    //     setMsg('connected');
    //     setConnected(true);
    //   };
    //   ws.onmessage = (message) => {
    //     console.log('received: %s', message.data);
    //     setMsg(message.data);
    //   };
    // }

  const handleDisconnect = (e) => {
    e.preventDefault();
    if (ws) {
      ws.close();
    }
    setMsg('Disconnected from WebSocket');
    setConnected(false);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const drawerWidth = 240;

  return (
    <>
    <CssBaseline />
    <NavBar sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }} />
    <Box display='flex'>
    <SideMenu />
    <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
       <Routes>
        <Route index element={<Home />} />
        <Route path="/ws" element={<WS />} />
        </Routes>       
      </Box>
      </Box>
    </>
  );
}



export default App;
