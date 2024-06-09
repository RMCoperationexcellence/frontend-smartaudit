// SidebarMenu.jsx
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider'; // Import Divider
import FactoryIcon from '@mui/icons-material/Factory';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { ExitToApp } from '@mui/icons-material';
import { logout } from '../services/Auth/AuthService';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import { ZoomInMap } from '@mui/icons-material';

export default function SidebarMenu({ open, toggleDrawer }) {
  const navigate = useNavigate();
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/selectPlant')}>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary={'เลือกโรงงาน'} />
            </ListItemButton>
          </ListItem>
          <Divider /> 
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/factoryactual')}>
              <ListItemIcon>
                <FactoryIcon />
              </ListItemIcon>
              <ListItemText primary={'ผลปฏิบัติงานในโรงงาน'} />
            </ListItemButton>
          </ListItem>
          <Divider /> 
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/auditform')}>
              <ListItemIcon>
                <FactCheckIcon />
              </ListItemIcon>
              <ListItemText primary={'แบบฟอร์ม'} />
            </ListItemButton>
          </ListItem>
          <Divider /> 
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/auditresult')}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary={'ผล Verify'} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary={'ออกจากระบบ'}/>
            </ListItemButton>
          </ListItem>
          <Divider />
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

