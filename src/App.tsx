import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import axiosInstance from './axiosConfig';
import BestSellers from './components/BestSellers';
import BookList from './components/BookList';
import Favorites from './components/Favorites';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import UserRectangle from './components/UserRectangle';

import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axiosInstance.get('/csrf-token');
        axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = response.data.token;
      } catch (error) {
        console.error('Error fetching CSRF token', error);
      }
    };

    fetchCsrfToken();
  }, []);

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <UserRectangle />
        <div className="main-content">
          <TopBar />
          <br></br>
          <br></br>
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/bestsellers" element={<BestSellers />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
