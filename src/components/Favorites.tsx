import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import SearchBar from './SearchBar';
import './Favorites.css';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/favorites');
        setFavorites(response.data);
      } catch (error: any) {
        console.error('Error fetching favorites', error.response?.data || error.message);
      }
    };

    fetchFavorites();
  }, []);

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

  return (
    <div className="favorites">
      <h1 className="section-link">Favorites</h1>
      <br />
      <SearchBar />
      <br />
      <div className="content-container">
        {favorites.map(favorite => (
          <div key={favorite.id} className="book-card">
            <div className="book-info">
              <i className="fa-solid fa-book-open book-icon"></i>
              <span className="book-title">{favorite.book.title} <span className="book-author">by {favorite.book.author}</span></span>
            </div>
            <div className="book-price">{favorite.book.price} GBP</div>
            <div className="book-stars">{renderStars(favorite.book.rating)}</div>
            <a href="#" className="edit-link">Edit</a>
            <a href="#" className="delete-link">Delete</a>
            <i className="fas fa-heart icon heart-icon"></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
