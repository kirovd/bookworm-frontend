import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import './Favorites.css';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/favorites');
        setFavorites(response.data); // Assuming the API returns data in the correct format
      } catch (error) {
        console.error('Error fetching favorites', error);
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
      <SearchBar />
      <div className="content-container">
        {favorites.map(favorite => (
          <div key={favorite.id} className="favorite-card">
            <i className="fa-solid fa-book-open"></i>
            <span>{favorite.title} by {favorite.author}</span>
            <span>{favorite.price} GBP</span>
            <span className="stars">{renderStars(favorite.rating)}</span>
            <button>Edit</button>
            <button>Delete</button>
            <i className="fas fa-heart icon"></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
