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

import WebRTC from './components/WebRTC';
import SideMenu from './components/SideMenu';
import './App.css';

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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: '100%',
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            WebSocket & WebRTC App
          </Typography>
        </Toolbar>
      </AppBar>
      <SideMenu />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Tabs value={currentTab} onChange={handleTabChange} centered>
          <Tab label="WebSocket" />
          <Tab label="WebRTC" />
        </Tabs>
        {currentTab === 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
              WebSocket Interface {connected && <ConnectWithoutContactIcon />}
            </Typography>
            <Typography variant="body1">{msg}</Typography>
            {!connected ? (
              <Button variant="contained" color="primary" onClick={handleConnect}>
                Connect to WebSocket
              </Button>
            ) : (
              <Button variant="contained" color="secondary" onClick={handleDisconnect}>
                Disconnect
              </Button>
            )}
          </Box>
        )}
        {currentTab === 1 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
              WebRTC Interface
            </Typography>
            <WebRTC />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default App;
