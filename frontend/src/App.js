import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import {Routes, Route} from 'react-router';

import WebRTC from './pages/webrtc/WebRTC';
import SideMenu from './components/SideMenu';
import './App.css';
import NavBar from './components/NavBar';
import WhyWS from './pages/ws/WhyWS';
import WhatIsWS from './pages/ws/WhatIsWS';
import WS from './pages/ws/WS';
import WhatisWebRTC from './pages/webrtc/WhatisWebRTC';
import WhyWebRTC from './pages/webrtc/WhyWebRTC';
import HowWS from './pages/ws/HowWS';

function App() {
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
        {/* WebSockets Path -> root is whyWS */}
        <Route index element={<WhyWS />} />
        <Route path="/what-is-ws" element={<WhatIsWS />} />
        <Route path="/ws" element={<WS />} />
        <Route path="/howws" element={<HowWS />} />
        {/* WebRTC Path */}
        <Route path="/what-is-webrtc" element={<WhatisWebRTC />} />
        <Route path="/why-webrtc" element={<WhyWebRTC />} />
        <Route path="/webrtc" element={<WebRTC />} />
        </Routes>       
      </Box>
      </Box>
    </>
  );
}



export default App;
