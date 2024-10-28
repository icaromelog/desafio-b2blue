import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from '../Shared/Sidebar';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
  },
});

export default function Layout({ children }) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Sidebar>
          {children}
        </Sidebar>
      </ThemeProvider>
    </div>
  );
}