import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useState } from 'react';
import { login } from '../../services/Auth/AuthService';

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        let formattedEmail = email;
        // Append @scg.com if not already present
        if (!email.endsWith('@scg.com')) {
            formattedEmail += '@scg.com';
        }

        // Remove @scg.com before sending to login function
        const emailToSend = formattedEmail.replace('@scg.com', '');

        try {
            await login(emailToSend, password);
            // Redirect to home page after successful login
            window.location.href = '/selectPlant';
        } catch (error) {
            setErrorMessage(error.message || 'Login failed');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h3">
                    Smart Audit
                </Typography>

                <Typography component="h1" variant="h5">
                    เข้าสู่ระบบ
                </Typography>

                {/* Form starts here */}
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email (@scg.com)"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogin}
                    >
                        เข้าสู่ระบบ
                    </Button>
                    {errorMessage && <Typography color="error" sx={{ marginTop: '20px' }}>{errorMessage}</Typography>}
                </Box>
            </Box>
            <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 5 }}>
                © {new Date().getFullYear()} CPAC System Management
            </Typography>
        </Container>
    );
}

export default LoginScreen;
