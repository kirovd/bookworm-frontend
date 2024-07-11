import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import axiosInstance from './axiosConfig';

const MainApp = () => {
  useEffect(() => {
    const initializeCsrfToken = async () => {
      await axiosInstance.get('/csrf-token');
    };

    initializeCsrfToken();
  }, []);

  return <App />;
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<MainApp />);
