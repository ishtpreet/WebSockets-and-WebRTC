import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SensorsIcon from '@mui/icons-material/Sensors';
import { useNavigate, useLocation } from 'react-router';

const drawerWidth = 240;

const menuItems = {
  websocket: [
      { label: 'Why Websockets?', path: '/', icon: <HelpOutlineIcon /> },
      { label: 'What is WS?', path: '/what-is-ws', icon: <InfoIcon /> },
      { label: 'Make your own', path: '/websocket-tutorial', icon: <BuildIcon /> },
      { label: 'WS in Action', path: '/ws', icon: <SensorsIcon /> },
  ],
  webrtc: [
      { label: 'Why Web RTC?', path: '/why-webrtc', icon: <HelpOutlineIcon /> },
      { label: 'What is Web RTC?', path: '/what-is-webrtc', icon: <InfoIcon /> },
      { label: 'Make your own', path: '/webrtc-tutorial', icon: <BuildIcon /> },
      { label: 'WebRTC in Action', path: '/webrtc', icon: <LiveTvIcon /> },
  ],
};

function SideMenu(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const { window, isMobile, setOpen } = props;

    const handleNavigation = (path, e) => {
        e.preventDefault();
        navigate(path);
    };

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    SER-598 Project on
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {menuItems.websocket.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            onClick={(e) => handleNavigation(item.path, e)}
                            selected={location.pathname === item.path}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {menuItems.webrtc.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            onClick={(e) => handleNavigation(item.path, e)}
                            selected={location.pathname === item.path}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                container={container}
                variant="temporary"
                open={isMobile}
                onClose={setOpen}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}

export default SideMenu;
