import React, { useEffect, useState } from 'react';

import axiosInstance from '../axiosConfig';
// Ensure the correct path to axiosConfig
import SearchBar from './SearchBar';

import './BestSellers.css';

const BestSellers: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/books');
        setBooks(response.data);
      } catch (error: any) {
        console.error('Error fetching books', error.response?.data || error.message);
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/favorites');
        const favoriteIds = new Set<number>(response.data.map((fav: any) => fav.book_id));
        setFavorites(favoriteIds);
      } catch (error: any) {
        console.error('Error fetching favorites', error.response?.data || error.message);
      }
    };

    fetchBooks();
    fetchFavorites();
  }, []);

  const toggleFavorite = async (bookId: number) => {
    const newFavorites = new Set(favorites);

    if (favorites.has(bookId)) {
      newFavorites.delete(bookId);
      try {
        await axiosInstance.delete(`/api/v1/favorites/${bookId}`);
      } catch (error: any) {
        console.error('Error removing favorite', error.response?.data || error.message);
      }
    } else {
      newFavorites.add(bookId);
      try {
        console.log('Adding favorite', { book_id: bookId });
        await axiosInstance.post('/api/v1/favorites', { book_id: bookId });
      } catch (error: any) {
        console.error('Error adding favorite', error.response?.data || error.message);
      }
    }
    setFavorites(newFavorites);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i 
          key={i} 
          className={`fa-star ${i <= rating ? 'fa-solid filled-star' : 'fa-regular empty-star'}`}
        ></i>
      );
    }
    return stars;
  };

  const formatPrice = (price: any) => {
    const parsedPrice = parseFloat(price);
    return isNaN(parsedPrice) ? price : parsedPrice.toFixed(0);
  };

  return (
    <div className="bestsellers">
      <br />
      <h1 className="section-link">New York Times Bestsellers</h1>
      <br />
      <SearchBar />
      <br />
      <div className="content-container">
        {books.map(book => (
          <div key={book.id} className="book-card">
            <div className="book-info">
              <i className="fa-solid fa-book-open book-icon"></i>
              <span className="book-title">{book.title} <span className="book-author">by {book.author}</span></span>
            </div>
            <div className="book-stars">{renderStars(book.rating)}</div>
            <div className="book-price">{formatPrice(book.price)} GBP</div>
            <i 
              className={`fa-heart ${favorites.has(book.id) ? 'fa-solid heart-icon' : 'fa-regular empty-heart'}`}
              onClick={() => toggleFavorite(book.id)}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
