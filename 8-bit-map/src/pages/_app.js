import * as React from 'react';
import Head from 'next/head';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/pages/theme';
import 'leaflet/dist/leaflet.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Your App Title</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
