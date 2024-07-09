import React from 'react';
import './SearchBar.css';

const SearchBar: React.FC = () => {
  return (
    <div className="search-bar-container">
      <div className="search-input-container">
        <div className="search-icon"></div>
        <input type="text" placeholder="What books would you like to find?" className="search-input" />
      </div>
      <button className="search-button">GO</button>
    </div>
  );
};

export default SearchBar;
