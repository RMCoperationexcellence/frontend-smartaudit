import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ExitToApp } from "@mui/icons-material";
import { logout } from "../services/Auth/AuthService";
import { useNavigate } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Your logout logic
    logout();
  };

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <div>
      <AppBar position="static" sx={{ justifyContent: "space-between" }}>
        <Toolbar>
        <IconButton color="inherit" edge="start" onClick={handleBack} sx={{ mr: 2 }}>
                        <ArrowBackIcon />
                    </IconButton>
          <Typography variant="h6" component="div">
            Smart Audit
          </Typography>
          <Button color="inherit"></Button>
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
