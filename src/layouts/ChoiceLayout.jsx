import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';

const ChoiceLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const name = location.state ? location.state.name : 'Default Screen Name'; // Fallback if no name

    const handleBack = () => {
        navigate('/auditform'); // Navigate back in history stack
    };
    
    return (
        <div style={{ paddingTop: '56px' }}> {/* Adjust this padding to match the height of your AppBar */}
            <AppBar position="fixed" sx={{ top: 0, backgroundColor: '#00BBF2', zIndex: 1000 }}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={handleBack} sx={{ mr: 2 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {name}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div style={{ marginTop: '56px' }}> {/* Adjust this margin to match the height of your AppBar */}
                {children}
            </div>
        </div>
    );
};

ChoiceLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ChoiceLayout;
