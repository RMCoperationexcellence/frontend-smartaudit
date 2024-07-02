// SidebarMenu.jsx
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import FactoryIcon from '@mui/icons-material/Factory';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { ExitToApp } from '@mui/icons-material';
import { logout } from '../services/Auth/AuthService';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import TableChartIcon from '@mui/icons-material/TableChart';
import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { getProfile } from '../services/Storage/UserService';

export default function SidebarMenu({ open, toggleDrawer }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile();
      setUser(profile.user);
      console.log(profile.user);
    };

    fetchProfile();
  }, []);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      {user && (
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
          <Typography variant="subtitle1">{`${user.TITLE} ${user.NAME} ${user.SNAME}`}</Typography>
          <Typography sx={{color: '#006a8a', fontSize: '14px', whiteSpace: 'nowrap'}}>{user.POS}</Typography>
        </Box>
      )}
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={'หน้าหลัก'} />
          </ListItemButton>
        </ListItem>
        <Divider />
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
          <ListItemButton onClick={() => navigate('/dashboard/plants')}>
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText primary={'ผลสรุป รายโรงงาน'} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <ExitToApp sx={{ color: 'red' }} />
            </ListItemIcon>
            <ListItemText primary={'ออกจากระบบ'} sx={{ color: 'red' }} />
          </ListItemButton>
        </ListItem>
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
