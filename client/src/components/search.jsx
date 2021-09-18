/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { turnOnAutoPlay } from '../slices/autoPlaySlice';

const Search = ({ setSearchTerm }) => {
  console.log('search');
  const dispatch = useDispatch();
  const [currentSearchValue, setCurrentSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setCurrentSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(currentSearchValue);
    dispatch(turnOnAutoPlay());
  };

  return (
    <div className="search">
      <form className="searchContainer" onSubmit={handleSearchSubmit}>
        <input placeholder="Search..." className="searchBar" onChange={handleSearchChange} />
        <FontAwesomeIcon className="searchIcon" icon={faSearch} />
      </form>
    </div>
  );
};

export default Search;
