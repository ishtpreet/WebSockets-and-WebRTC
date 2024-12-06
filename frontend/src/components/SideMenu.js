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
import { useNavigate, useLocation} from 'react-router';

const drawerWidth = 240;

function SideMenu(props) {
    const navigate = useNavigate();
    const location = useLocation();

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerClose = () => {
        setMobileOpen(false);
    };

    const handleClick = (type, e, index) => {
        e.preventDefault();
        if (type === 'ws') {
            if (index === 0) navigate('/');
            if (index === 1) navigate('/what-is-ws');
            if (index === 2) navigate('/ws');
        } else if (type === 'webrtc') {
            if (index === 0) navigate('/why-webrtc');
            if (index === 1) navigate('/what-is-webrtc');
            if (index === 2) navigate('/webrtc');
        }
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
                {['Why Websockets?', 'What is WS?', 'WS in Action'].map((text, index) => {
                    const pathMap = ['/', '/what-is-ws', '/ws'];
                    return (
                        <ListItem key={text} disablePadding>
                            <ListItemButton
                                onClick={(e) => handleClick('ws', e, index)}
                                selected={location.pathname === pathMap[index]} 
                            >
                                <ListItemIcon>
                                    {(index === 0 || index === 1) && <QuestionMarkIcon />}
                                    {index === 2 && <SensorsIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            <Divider />
            <List>
                {['Why Web RTC?', 'What is Web RTC?', 'WebRTC in Action'].map((text, index) => {
                    const pathMap = ['/why-webrtc', '/what-is-webrtc', '/webrtc'];
                    return (
                        <ListItem key={text} disablePadding>
                            <ListItemButton
                                onClick={(e) => handleClick('webrtc', e, index)}
                                selected={location.pathname === pathMap[index]} 
                            >
                                <ListItemIcon>
                                    {(index === 0 || index === 1) && <QuestionMarkIcon />}
                                    {index === 2 && <OndemandVideoIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
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
