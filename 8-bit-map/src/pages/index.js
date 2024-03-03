import { Container, Box, Typography, AppBar, Toolbar, Paper, TextField } from '@mui/material';
import dynamic from 'next/dynamic';

import React, { useEffect, useState } from 'react';

import branchData from '&/branches.json';
import atmData from '&/atms.json';

const MapComponentWithNoSSR = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
});

export default function Home() {

  const [branches, setBranches] = useState([]);
  const [atms, setAtms] = useState([]);

  useEffect(() => {
    // Assuming the structure of your JSON and extracting relevant data
    const branches = branchData.data.flatMap(item => item.Brand.flatMap(brand => brand.Branch.map(branch => ({
      ...branch,
      coordinates: [
        parseFloat(branch.PostalAddress.GeoLocation.GeographicCoordinates.Latitude),
        parseFloat(branch.PostalAddress.GeoLocation.GeographicCoordinates.Longitude),
      ]
    }))));
    setBranches(branches);
  }, []);

  useEffect(() => {
    // Assuming the structure of your JSON and extracting relevant data
    const atms = atmData.data.flatMap(item => item.Brand.flatMap(brand => brand.ATM.map(atm => ({
      ...atm,
      coordinates: [
        parseFloat(atm.Location.PostalAddress.GeoLocation.GeographicCoordinates.Latitude),
        parseFloat(atm.Location.PostalAddress.GeoLocation.GeographicCoordinates.Longitude),
      ]
    }))));
    setAtms(atms);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            8 Bit Map
          </Typography>
        </Toolbar>
      </AppBar>
      <Box flex={1} sx={{ position: 'relative', m: 0, p: 0, overflow: 'hidden' }}>
        <MapComponentWithNoSSR initCenter={[56.4620, -2.9707]} initZoom={20} branches={branches} atms={atms}/>
      </Box>
      <Paper elevation={0} square>
        <Box p={'5px'}>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            © 2024 8 Bit Map. All rights reserved.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
