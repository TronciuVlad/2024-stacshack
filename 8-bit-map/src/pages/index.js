import { Container, Box, Typography, AppBar, Toolbar, Paper, TextField } from '@mui/material';
import dynamic from 'next/dynamic';

const MapComponentWithNoSSR = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
});

export default function Home() {
  return (
    <Container maxWidth="100vw">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            8 Bit Map
          </Typography>
        </Toolbar>
      </AppBar>
      <Box flex={1}
            sx={{
              m: 0, // shorthand for margin: 0
              p: 0, // shorthand for padding: 0
              overflow: Hidden,
            }}>
        <MapComponentWithNoSSR center={[51.505, -0.09]} zoom={13} />
      </Box>
      <Paper elevation={0} square>
        <Box p={'5px'}> {/* Set padding to 0 */}
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            © 2024 Simple Layout. All rights reserved.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
