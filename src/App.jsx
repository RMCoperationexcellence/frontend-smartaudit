import Router from "./Router";
import { isAuthenticated } from "./services/Auth/AuthService";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const isAuth = isAuthenticated();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router isAuthenticated={isAuth} />
      </ThemeProvider>
)
}

export default App;
