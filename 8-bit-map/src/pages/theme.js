import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
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
