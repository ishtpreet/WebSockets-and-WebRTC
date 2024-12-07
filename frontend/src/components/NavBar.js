// import React from 'react'
// import AppBar from '@mui/material/AppBar'
// import Toolbar from '@mui/material/Toolbar'
// import Typography from '@mui/material/Typography'
// import Box from '@mui/material/Box'


// export default function NavBar(props) {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static" {...props}>
//         <Toolbar variant="regular">
//           {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
//             <MenuIcon />
//           </IconButton> */}
//           <Typography variant="h6" color="inherit" component="div">
//             WebSocket & WebRTC
//           </Typography>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   )
// }
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar({ toggleDrawer }) {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={toggleDrawer}
                    sx={{ display: { sm: 'none' }, mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    SER-598 Project
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
