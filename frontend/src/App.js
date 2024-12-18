import React, {useState} from 'react';
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
import WebRTCTutorial from './pages/webrtc/WebRTCTutorial';
import WebSocketTutorial from './pages/ws/WebSocketTutorial';
import LearningOutcome from './pages/LearningOutcomes';
import Resources from './pages/Resources';

function App() {
  const drawerWidth = 330;
  const [open, setOpen] = useState(false);

  return (
    <>
    <CssBaseline />
    <NavBar 
      toggleDrawer={() => setOpen(!open)}
    sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }} />
    <Box display='flex'>
    <SideMenu isMobile={open} setOpen={setOpen}  />
    <Box
        component="main"
        sx={{ marginTop: '3%', flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
       <Routes>
        {/* WebSockets Path -> root is whyWS */}
        <Route index element={<WhyWS />} />
        <Route path="/tech-explained" element={<WhatIsWS />} />
        <Route path="/ws" element={<WS />} />
        <Route path="/websocket-tutorial" element={<WebSocketTutorial />} />
        {/* WebRTC Path */}
        <Route path="/what-is-webrtc" element={<WhatisWebRTC />} />
        <Route path="/why-webrtc" element={<WhyWebRTC />} />
        <Route path="/webrtc" element={<WebRTC />} />
        <Route path="/webrtc-tutorial" element={<WebRTCTutorial />} />
        {/* Extra Links */}
        <Route path="/learning-outcomes" element={<LearningOutcome />} />
        <Route path="/resources" element={<Resources />} />
        </Routes>       
      </Box>
      </Box>
    </>
  );
}



export default App;
