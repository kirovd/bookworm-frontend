import React, { useEffect, useState } from 'react';
import { useFavorites } from './FavoritesContext';
import { useBooks } from './BooksContext';
import axiosInstance from '../axiosConfig';
import SearchBar from './SearchBar';
import EditBook from './EditBook';
import './Favorites.css';

const Favorites: React.FC = () => {
  const [favoritesList, setFavoritesList] = useState<any[]>([]);
  const [filteredFavoritesList, setFilteredFavoritesList] = useState<any[]>([]);
  const { removeFavorite } = useFavorites();
  const { books, setBooks } = useBooks();
  const [editingBook, setEditingBook] = useState<any>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/favorites');
        setFavoritesList(response.data);
        setFilteredFavoritesList(response.data);
      } catch (error: any) {
        console.error('Error fetching favorites', error.response?.data || error.message);
      }
    };

    fetchFavorites();
  }, []);

  const deleteFavorite = async (bookId: string) => {
    try {
      await axiosInstance.delete(`/api/v1/favorites/${bookId}`);
      removeFavorite(bookId);
      setFavoritesList(favoritesList.filter(favorite => favorite.book_id !== bookId));
      setFilteredFavoritesList(filteredFavoritesList.filter(favorite => favorite.book_id !== bookId));
    } catch (error: any) {
      console.error('Error deleting favorite', error.response?.data || error.message);
    }
  };

  const handleUpdate = (updatedBook: any) => {
    setFavoritesList(prevList =>
      prevList.map(book => (book.book_id === updatedBook.book_id ? updatedBook : book))
    );
    setFilteredFavoritesList(prevList =>
      prevList.map(book => (book.book_id === updatedBook.book_id ? updatedBook : book))
    );
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.primary_isbn13 === updatedBook.book_id ? { ...book, ...updatedBook } : book
      )
    );
  };

  const renderStars = (rating: number | null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i 
          key={i} 
          className={`fa-star ${i <= (rating || 0) ? 'fa-solid filled-star' : 'fa-regular empty-star'}`}
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
    const filtered = favoritesList.filter(favorite =>
      favorite.title.toLowerCase().includes(query.toLowerCase()) ||
      favorite.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFavoritesList(filtered);
  };

  if (editingBook) {
    return <EditBook book={editingBook} onUpdate={() => handleUpdate} />;
  }

  return (
    <div className="favorites">
      <h1 className="section-link">Favorites</h1>
      <br />
      <SearchBar onSearch={onSearch} />
      <br />
      <div className="content-container">
        {filteredFavoritesList.map(favorite => (
          <div key={favorite.book_id} className="book-card">
            <div className="book-info">
              <i className="fa-solid fa-book-open book-icon"></i>
              <span className="book-title">{favorite.title} <span className="book-author">by {favorite.author || 'Unknown Author'}</span></span>
            </div>
            <div className="book-price">{formatPrice(favorite.price)} GBP</div>
            <div className="book-stars">{renderStars(favorite.rating)}</div>
            <a href="#" className="edit-link" onClick={() => setEditingBook(favorite)}>Edit</a>
            <a href="#" className="delete-link" onClick={() => deleteFavorite(favorite.book_id)}>Delete</a>
            <i className="fas fa-heart icon heart-icon"></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
