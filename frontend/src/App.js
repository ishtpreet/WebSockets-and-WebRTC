import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';


import SideMenu from './components/SideMenu';
import './App.css';
import { Button } from '@mui/material';

function App() {

  const [ws, setWs] = useState(null);
  const [msg, setMsg] = useState('');
  const [connected, setConnected] = useState(false);

    
    const handleConnect = (e) => {
      e.preventDefault();
      const ws = new WebSocket('ws://localhost:3001');
      setWs(ws);
      ws.onopen = () => {
        console.log('connected');
        setMsg('connected');
        setConnected(true);
      };
      ws.onmessage = (message) => {
        console.log('received: %s', message.data);
        setMsg(message.data);
      };
    }

    const handleDisconnect = (e) => {
      e.preventDefault();
      ws.close();
      setMsg('disconnected');
      setConnected(false);
    }

const drawerWidth = 240;

  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      {/* <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          // onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Responsive drawer
        </Typography>
      </Toolbar> */}
    </AppBar>
    <SideMenu />
    <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <h1>Content &nbsp; {connected && <ConnectWithoutContactIcon />}</h1>
        <p>{msg}</p>
        
       {!connected ? <Button variant="contained" color="primary" onClick={handleConnect}>Connect to WS</Button> : <Button variant="contained" color="secondary" onClick={handleDisconnect}>Disconnect</Button>}
       
      </Box>
    </Box>
  );
}

export default App;
