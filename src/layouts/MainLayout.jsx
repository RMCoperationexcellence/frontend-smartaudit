import { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SidebarMenu from '../components/Sidebar'; // Import SidebarMenu component

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(false);


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#00BBF2' }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
            {/* Call toggleDrawer with true to open the drawer */}
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Smart Audit
          </Typography>
          <Button color="inherit"></Button>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
      {children}
      <SidebarMenu open={open} toggleDrawer={toggleDrawer} /> {/* Pass open state and toggleDrawer function as props */}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
