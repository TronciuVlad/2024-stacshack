import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#342a7a',
    },
  },
  typography: {
    "fontFamily": `"ArcadeClassic", monospace`,
    "fontSize": 20,
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          // Override styles here
          paddingLeft: '0 !important', // Remove padding left
          paddingRight: '0 !important', // Remove padding right
          margin: 0, // Remove margin
        },
      },
    },
  },
});

export default theme;
