import React from 'react';
import './EditBook.css';

const CardEdit: React.FC<{ id: number, title: string, author: string }> = ({ id, title, author }) => {
  let backgroundUrl = '';

  if (id === 1) {
    backgroundUrl = 'ugur-akdemir-XT-o5O458as-unsplash.jpeg';
  } else if (id === 2) {
    backgroundUrl = 'roman-kraft-X1exjxxBho4-unsplash.jpeg';
  } else if (id === 3) {
    backgroundUrl = 'rawkkim-RYGrvZWSMNE-unsplash.jpeg';
  } else if (id === 6) {
    backgroundUrl = '1.jpeg'; 
  } else if (id === 7) {
    backgroundUrl = '2.jpeg'; 
  } else if (id === 8) {
    backgroundUrl = '3.jpeg';
  }

  return (
    <div className="card-edit" style={{ backgroundImage: `url(${backgroundUrl})` }}>
    </div>
  );
};

export default CardEdit;
