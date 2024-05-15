import { Button, Container, Typography, Box } from '@mui/material';
import { logout } from "../../services/Auth/AuthService";

function NotfoundScreen() {
  return (
    <Container 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh', 
        textAlign: 'center' 
      }}
    >
      <Box 
        sx={{ 
          bgcolor: 'background.paper', 
          p: 4, 
          borderRadius: 2, 
          boxShadow: 3 
        }}
      >
        <Typography variant="h1" component="div" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="div" gutterBottom>
          ไม่พบหน้าที่คุณต้องการ
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={logout}
          sx={{ mt: 3 }}
        >
          ออกจากระบบ
        </Button>
      </Box>
    </Container>
  );
}

export default NotfoundScreen;
