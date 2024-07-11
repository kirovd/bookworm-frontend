import React, { useEffect, useState } from 'react';
import { useFavorites } from './FavoritesContext';
import axiosInstance from '../axiosConfig';
import SearchBar from './SearchBar';
import './Favorites.css';

const Favorites: React.FC = () => {
  const [favoritesList, setFavoritesList] = useState<any[]>([]);
  const { removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/favorites');
        setFavoritesList(response.data);
      } catch (error: any) {
        console.error('Error fetching favorites', error.response?.data || error.message);
      }
    };

    fetchFavorites();
  }, []);

  const deleteFavorite = async (bookId: number) => {
    try {
      await axiosInstance.delete(`/api/v1/favorites/${bookId}`);
      removeFavorite(bookId);
      setFavoritesList(favoritesList.filter(favorite => favorite.book.id !== bookId));
    } catch (error: any) {
      console.error('Error deleting favorite', error.response?.data || error.message);
    }
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

  return (
    <div className="favorites">
      <h1 className="section-link">Favorites</h1>
      <br />
      <SearchBar />
      <br />
      <div className="content-container">
        {favoritesList.map(favorite => (
          <div key={favorite.id} className="book-card">
            <div className="book-info">
              <i className="fa-solid fa-book-open book-icon"></i>
              <span className="book-title">{favorite.book.title} <span className="book-author">by {favorite.book.author}</span></span>
            </div>
            <div className="book-price">{favorite.book.price} GBP</div>
            <div className="book-stars">{renderStars(favorite.book.rating)}</div>
            <a href="#" className="edit-link">Edit</a>
            <a href="#" className="delete-link" onClick={() => deleteFavorite(favorite.book.id)}>Delete</a>
            <i className="fas fa-heart icon heart-icon"></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
