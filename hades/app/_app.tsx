// _app.tsx (or create one if it doesn't exist)
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import type { AppProps } from 'next/app';
import '../globals.css'; // Assuming this file is for global styles

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Router>
      <Component {...pageProps} />
    </Router>
  );
}

export default MyApp;
