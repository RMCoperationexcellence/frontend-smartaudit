import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { ExitToApp } from "@mui/icons-material";
import { logout } from "../services/Auth/AuthService";

const MainLayout = ({ children }) => {

  const handleLogout = () => {
    // Your logout logic
    logout();
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Smart Audit
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            color="inherit"
            aria-label="logout"
            onClick={handleLogout}
          >
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
