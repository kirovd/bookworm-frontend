import React, { useState, useEffect } from 'react';
import './StarRating.css';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const [currentRating, setCurrentRating] = useState(rating);

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const handleRating = (rate: number) => {
    setCurrentRating(rate);
    onRatingChange(rate);
  };

  return (
    <div className="star-rating">
      {Array.from({ length: 5 }, (_, index) => (
        <i
          key={index}
          className={`fa-star ${index < currentRating ? 'fa-solid filled-star' : 'fa-regular empty-star'}`}
          onClick={() => handleRating(index + 1)}
        ></i>
      ))}
    </div>
  );
};

export default StarRating;
