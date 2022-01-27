/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { turnOnAutoPlay } from '../../slices/autoPlaySlice';
import styles from './search.module.css';

const Search = ({ setSearchTerm }) => {
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
    <div className={styles.search}>
      <form className={styles.searchContainer} onSubmit={handleSearchSubmit}>
        <input placeholder="Search..." className={styles.searchBar} onChange={handleSearchChange} />
        <FontAwesomeIcon className={styles.searchIcon} icon={faSearch} />
      </form>
    </div>
  );
};

export default Search;
