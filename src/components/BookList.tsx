import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import SearchBar from './SearchBar';
import './BookList.css';
import { Link } from 'react-router-dom';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([
    { id: 6, title: 'Favorite Book 1', author: 'Favorite Author 1' },
    { id: 7, title: 'Favorite Book 2', author: 'Favorite Author 2' },
    { id: 8, title: 'Favorite Book 3', author: 'Favorite Author 3' },
  ]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/books');
        setBooks(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching books', error);
      }
    };

    fetchBooks();
  }, []);

  const onSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  return (
    <div className="booklist">
      <br />
      <SearchBar onSearch={onSearch} />
      <br />
      <div className="section-header">
        <Link to="/bestsellers" className="section-link">New York Times Bestsellers</Link>
      </div>
      <div className="card-container">
        {books.map(book => (
          <Card key={book.id} id={book.id} title={book.title} author={book.author} />
        ))}
      </div>
      <br></br>
      <div className="section-header">
        <Link to="/favorites" className="section-link">Favorites</Link>
      </div>
      <div className="card-container">
        {favorites.map(favorite => (
          <Card key={favorite.id} id={favorite.id} title={favorite.title} author={favorite.author} />
        ))}
      </div>
    </div>
  );
};

export default BookList;