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
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SensorsIcon from '@mui/icons-material/Sensors';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { useNavigate, useLocation } from 'react-router';

const drawerWidth = 240;

const menuItems = {
    websocket: [
        { label: 'Why Websockets?', path: '/', icon: <QuestionMarkIcon /> },
        { label: 'What is WS?', path: '/what-is-ws', icon: <QuestionMarkIcon /> },
        { label: 'WS in Action', path: '/ws', icon: <SensorsIcon /> },
    ],
    webrtc: [
        { label: 'Why Web RTC?', path: '/why-webrtc', icon: <QuestionMarkIcon /> },
        { label: 'What is Web RTC?', path: '/what-is-webrtc', icon: <QuestionMarkIcon /> },
        { label: 'Make your own', path: '/webrtc-tutorial', icon: <OndemandVideoIcon /> },
        { label: 'WebRTC in Action', path: '/webrtc', icon: <SensorsIcon /> },
    ],
};

function SideMenu(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerClose = () => {
        setMobileOpen(false);
    };

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
                open={mobileOpen}
                onClose={handleDrawerClose}
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
