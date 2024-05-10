import Router from "./Router";
import { isAuthenticated } from "../../frontend-sma/src/services/authService";
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
