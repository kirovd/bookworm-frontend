import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import axiosInstance from './axiosConfig';

const MainApp = () => {
  useEffect(() => {
    // Fetch and set CSRF token on initial load
    const initializeCsrfToken = async () => {
      await axiosInstance.get('/csrf-token');
    };

    initializeCsrfToken();
  }, []);

  return <App />;
};

const container = document.getElementById('root');
const root = createRoot(container); // createRoot is now used instead of ReactDOM.render
root.render(<MainApp />);
