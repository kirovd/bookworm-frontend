import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

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

ReactDOM.render(<MainApp />, document.getElementById('root'));
