import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { FavoritesProvider } from './components/FavoritesContext';
import { BooksProvider } from './components/BooksContext';
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
  return (
    <FavoritesProvider>
      <BooksProvider>
        <Router>
          <div className="App">
            <Sidebar />
            <UserRectangle />
            <div className="main-content">
              <TopBar />
              <br />
              <br />
              <Routes>
                <Route path="/" element={<BookList />} />
                <Route path="/bestsellers" element={<BestSellers />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </div>
          </div>
        </Router>
      </BooksProvider>
    </FavoritesProvider>
  );
}

export default App;
