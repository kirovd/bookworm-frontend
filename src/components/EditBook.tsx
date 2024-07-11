import React, { useState } from 'react';
import CardEdit from './CardEdit';
import StarRating from './StarRating';
import './EditBook.css';

const EditBook: React.FC<{ book: any, onUpdate: () => void }> = ({ book, onUpdate }) => {
  const [price, setPrice] = useState(parseInt(book.price)); // Parse the price to get the integer part
  const [rating, setRating] = useState(book.rating);

  const handleUpdate = () => {
    // Here you would send the update to the backend
    // and call the onUpdate function to refresh the favorites list
    onUpdate();
  };

  const backgroundUrls = [
    'ugur-akdemir-XT-o5O458as-unsplash.jpeg',
    'roman-kraft-X1exjxxBho4-unsplash.jpeg',
    'rawkkim-RYGrvZWSMNE-unsplash.jpeg',
    '1.jpeg',
    '2.jpeg',
    '3.jpeg',
  ];

  const randomBackgroundUrl = backgroundUrls[Math.floor(Math.random() * backgroundUrls.length)];

  return (
    <div className="edit-book">
      <div className="card-edit" style={{ backgroundImage: `url(${randomBackgroundUrl})` }}>
        <div className="book-title-edit">
          <span className="title-edit">{book.title}</span> <span className="book-author-edit">by {book.author}</span>
        </div>
      </div>
      <br />
      <br />
      <div className="edit-label">Edit</div>
      <br />
      <div className="edit-fields">
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">Cost</div>
          </div>
          <div className="price-input-container">
            <input
              type="text"
              className="form-control field-input-edit price-input"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
            <span className="currency-text">GBP</span>
          </div>
        </div>
        <br />
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">Rating</div>
          </div>
          <div className="form-control field-input-edit star-rating-container">
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>
        </div>
      </div>
      <br />
      <button className="update-button" onClick={handleUpdate}>UPDATE</button>
      <br />
      <br />
      <br />
      <div className="return-link" onClick={onUpdate}>
        <span className="arrow">←</span> 
        <span className="whitespace">Return to</span>&nbsp;
        <span className="favoritesPage">Favorites</span>
      </div>
    </div>
  );
};

export default EditBook;
