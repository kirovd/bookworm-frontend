import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };
  return (
    <div className="search-bar-container">
      <div className="search-input-container">
        <div className="search-icon"></div>
        <input type="text" value={query}
      onChange={handleInputChange} placeholder="What books would you like to find?" className="search-input" />
      </div>
      <button className="search-button">GO</button>
    </div>
  );
};
export default SearchBar;