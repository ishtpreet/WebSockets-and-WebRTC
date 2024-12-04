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
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SensorsIcon from '@mui/icons-material/Sensors';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import {useNavigate} from 'react-router'
import Typography from '@mui/material/Typography';


const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const navigate = useNavigate();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

//   const handleDrawerToggle = () => {
//     if (!isClosing) {
//       setMobileOpen(!mobileOpen);
//     }
//   };

const handleClick = (type ,e, index) => {
    // console.log(index, e);
    e.preventDefault();
    if(type === 'ws'){
    if(index === 0){
        navigate('/why-websockets');
        }
    if(index === 1){
        navigate('/what-is-ws');
        }
    if(index === 2){
        navigate('/ws');
        }
    if(index === 3){
        navigate('/ws-file-transfer');
        }
      }
      else if(type === 'webrtc'){
        if(index === 0){
            navigate('/why-webrtc');
            }
        if(index === 1){
            navigate('/what-is-webrtc');
            }
        if(index === 2){
            navigate('/webrtc');
            }
          }

}

  const drawer = (
    <div>
      <Toolbar>
      <Typography variant="h6" noWrap component="div">
            SER-598 Project on
          </Typography>
      </Toolbar>
      <Divider />
      <List>
        {['Why Websockets?', 'What is WS?', 'WS in Action', 'WS file transfer'].map((text, index) => (
          <ListItem key={text} disablePadding>
                
            <ListItemButton onClick={(e)=> handleClick('ws', e, index)}>
              <ListItemIcon>
                {(index === 0 || index === 1) && <QuestionMarkIcon />}
                {index === 2 && <SensorsIcon />}
                {index === 3 && <ConnectWithoutContactIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Why Web RTC?', 'What is Web RTC?', 'WebRTC in Action'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={(e) => handleClick('webrtc', e, index)}>
              <ListItemIcon>
              {(index === 0 || index === 1) && <QuestionMarkIcon />}
                {index === 2 && <OndemandVideoIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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

export default ResponsiveDrawer;
