import { Container, Box, Typography, AppBar, Toolbar, Paper } from '@mui/material';
import dynamic from 'next/dynamic';

const MapComponentWithNoSSR = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
});

export default function Home() {
  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            8 Bit Map
          </Typography>
        </Toolbar>
      </AppBar>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Main Page Content
        </Typography>
        <MapComponentWithNoSSR center={[51.505, -0.09]} zoom={13} />
      </Box>
      <Paper elevation={0} square>
        <Box p={2}>
          <Typography variant="body1">
            © 2024 Simple Layout. All rights reserved.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
