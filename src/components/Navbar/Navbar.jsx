import React, { useState } from 'react';
import { FaTasks, FaSearch, FaTimes } from 'react-icons/fa';
import './Navbar.scss';

function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <nav className="navbar">
      <FaTasks className="navbar__logo" />
      <h1 className="navbar__title">To Do List</h1>
      <div className="navbar__search">
        <FaSearch className="navbar__search-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Поиск задач..."
          className="navbar__search-input"
        />
        {searchQuery && (
          <button onClick={clearSearch} className="navbar__clear-btn">
            <FaTimes />
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;