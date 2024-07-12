import React, { useState } from 'react';
import CardEdit from './CardEdit';
import StarRating from './StarRating';
import axiosInstance from '../axiosConfig';
import './EditBook.css';

const EditBook: React.FC<{ book: any, onUpdate: () => void }> = ({ book, onUpdate }) => {
  const [price, setPrice] = useState<string>(`${parseInt(book.price)} GBP`);
  const [rating, setRating] = useState(book.rating);
  const [initialPrice] = useState<string>(`${parseInt(book.price)} GBP`);
  const [initialRating] = useState(book.rating);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleUpdate = async () => {
    const numericPrice = parseInt(price.replace(/[^0-9]/g, ''));
    if (isNaN(numericPrice)) {
      setModalMessage('Please enter a valid price');
      setShowModal(true);
      return;
    }
    try {
      await axiosInstance.put(`/api/v1/books/${book.id}`, { price: numericPrice, rating });
      let message = 'You have successfully updated ';
      if (`${numericPrice} GBP` !== initialPrice && rating !== initialRating) {
        message += `the price to ${numericPrice} GBP and the rating to ${rating}`;
      } else if (`${numericPrice} GBP` !== initialPrice) {
        message += `the price to ${numericPrice} GBP`;
      } else if (rating !== initialRating) {
        message += `the rating to ${rating}`;
      }
      setModalMessage(message);
      setShowModal(true);
    } catch (error) {
      console.error('Error updating book', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (modalMessage !== 'Please enter a valid price') {
      onUpdate();
    }
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

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (!isNaN(Number(value))) {
      setPrice(value + ' GBP');
    } else {
      setPrice('');
    }
  };

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
              onChange={handlePriceChange}
            />
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
        <span className="whitespace">Return to: </span>&nbsp;
        <span className="favoritesPage">Favorites</span>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={handleCloseModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBook;
