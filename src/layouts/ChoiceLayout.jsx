import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';

const ChoiceLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const name = location.state ? location.state.name : 'Default Screen Name'; // Fallback if no name

    const handleBack = () => {
        navigate(-1); // Navigate back in history stack
    };
    
    return (
        <div>
            <AppBar position="static" sx={{backgroundColor: '#00BBF2'}}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={handleBack} sx={{ mr: 2 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {name}
                    </Typography>
                </Toolbar>
            </AppBar>
            {children}
        </div>
    );
};

ChoiceLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ChoiceLayout;
