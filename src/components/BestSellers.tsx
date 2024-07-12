import React, { useEffect, useState } from 'react';
import { useFavorites } from './FavoritesContext';
import axiosInstance from '../axiosConfig';
import SearchBar from './SearchBar';
import './BestSellers.css';

const BestSellers: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [filteredBooksList, setFilteredBooksList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const internalResponse = await axiosInstance.get('/api/v1/books');
        const externalResponse = await axiosInstance.get('/api/v1/external-books');
        const allBooks = [...internalResponse.data, ...externalResponse.data];
        setBooks(allBooks);
        setFilteredBooksList(allBooks);
      } catch (error: any) {
        console.error('Error fetching books', error.response?.data || error.message);
        if (error.response?.data) {
          alert(`Error: ${error.response.data.error}`);
        } else {
          alert('Error fetching books from the external API');
        }
      }
    };
  
    const fetchFavorites = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/favorites');
        const favoriteIds = new Set<number>(response.data.map((fav: any) => fav.book_id));
        favoriteIds.forEach(id => addFavorite(id));
      } catch (error: any) {
        console.error('Error fetching favorites', error.response?.data || error.message);
      }
    };
  
    fetchBooks();
    fetchFavorites();
  }, [addFavorite]);

  const toggleFavorite = async (bookId: number | undefined) => {
    if (!bookId) {
      console.error('Invalid book id');
      return;
    }

    if (favorites.has(bookId)) {
      removeFavorite(bookId);
      try {
        await axiosInstance.delete(`/api/v1/favorites/${bookId}`);
      } catch (error: any) {
        console.error('Error removing favorite', error.response?.data || error.message);
      }
    } else {
      addFavorite(bookId);
      try {
        await axiosInstance.post('/api/v1/favorites', { book_id: bookId });
      } catch (error: any) {
        console.error('Error adding favorite', error.response?.data || error.message);
      }
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

  const formatPrice = (price: any) => {
    const parsedPrice = parseFloat(price);
    return isNaN(parsedPrice) ? price : parsedPrice.toFixed(0);
  };

  const onSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(lowerCaseQuery) ||
      book.author.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredBooksList(filtered);
  }, [searchQuery, books]);

  return (
    <div className="bestsellers">
      <br />
      <h1 className="section-link">New York Times Bestsellers</h1>
      <br />
      <SearchBar onSearch={onSearch} />
      <br />
      <div className="content-container">
        {filteredBooksList.map((book, index) => (
          <div key={`book-${book.id}-${index}`} className="book-card">
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
