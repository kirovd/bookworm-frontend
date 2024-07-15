import React, { useEffect, useState } from 'react';
import { useFavorites } from './FavoritesContext';
import axiosInstance from '../axiosConfig';
import SearchBar from './SearchBar';
import './BestSellers.css';

const BestSellers: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { favorites, addFavorite } = useFavorites();
  const [filteredBooksList, setFilteredBooksList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (loading) {
          const externalResponse = await axiosInstance.get('/api/v1/external-books');
          console.log('Fetched books data:', externalResponse.data);
          const allBooks = externalResponse.data.slice(0, 9);
          setBooks(allBooks);
          setLoading(false);
        }
      } catch (error: any) {
        console.error('Error fetching books', error.response?.data || error.message);
        alert('Error fetching books from the external API');
        setLoading(false);
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/favorites');
        const favoriteBooks: any[] = response.data.map((fav: any) => ({
          id: fav.id,
          book_id: fav.book_id,
          title: fav.title,
          author: fav.author,
          price: fav.price,
          rating: fav.rating,
        }));
        favoriteBooks.forEach(fav => addFavorite(fav));
      } catch (error: any) {
        console.error('Error fetching favorites', error.response?.data || error.message);
      }
    };

    fetchBooks();
    fetchFavorites();
  }, [addFavorite, loading]);

  useEffect(() => {
    const mergedBooks = books.map(book => {
      const favorite = Array.from(favorites).find((fav: any) => fav.book_id === book.primary_isbn13);
      if (favorite) {
        return { ...book, price: favorite.price, rating: favorite.rating };
      }
      return book;
    });
    setFilteredBooksList(mergedBooks);
  }, [books, favorites]);

  const addToFavorites = async (book: any) => {
    const bookId = book.primary_isbn13;

    if (!Array.from(favorites).some((fav: any) => fav.book_id === bookId)) {
      addFavorite({
        id: bookId,
        book_id: bookId,
        title: book.title,
        author: book.author,
        price: book.price,
        rating: book.rating,
      });
      try {
        await axiosInstance.post('/api/v1/favorites', {
          book_id: bookId,
          title: book.title,
          author: book.author,
          price: book.price,
          rating: book.rating
        });
      } catch (error: any) {
        console.error('Error adding favorite', error.response?.data || error.message);
      }
    }
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
          <div key={`book-${book.primary_isbn13}-${index}`} className="book-card">
            <div className="book-info">
              <i className="fa-solid fa-book-open book-icon"></i>
              <span className="book-title">{book.title} <span className="book-author">by {book.author}</span></span>
            </div>
            <div className="book-stars">{renderStars(book.rating || 0)}</div>
            <div className="book-price">{formatPrice(book.price)} GBP</div>
            <i 
              className={`fa-heart ${Array.from(favorites).some((fav: any) => fav.book_id === book.primary_isbn13) ? 'fa-solid heart-icon' : 'fa-regular empty-heart'}`}
              onClick={() => addToFavorites(book)}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
