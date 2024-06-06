import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [date, setDate] = useState('');

  const handleSearch = () => {
    if (date) {
      onSearch(new Date(date));
    }
  };

  return (
    <div className="search-bar">
    <input
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="search-input"
    />
    <button className="search-button" onClick={handleSearch}>Search</button>
  </div>
  );
};

export default SearchBar;
