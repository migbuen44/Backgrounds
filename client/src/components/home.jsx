import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { openModal } from '../slices/loginModalSlice';
import MusicPlayer from './musicPlayer';
import LoginModal from './loginModal';
import PlaylistContainer from './playlistContainer';
import ImageContainer from './imageContainer';

const code = new URLSearchParams(window.location.search).get('code');

const Home = () => {
  // let [value, setValue] = useState('chill');
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.userLogin.value);
  const [loggedIn, setLoggedIn] = useState(userLoggedIn);
  const [currentSearchValue, setCurrentSearchValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [intervalState, setIntervalState] = useState(true);

  useEffect(() => {
    setLoggedIn(userLoggedIn);
  }, [userLoggedIn]);

  const handleSearchChange = (e) => {
    setCurrentSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(currentSearchValue);
  };

  const handleLoginClick = () => {
    dispatch(openModal());
  };

  const pause = () => {
    console.log(intervalState);
    // if (intervalState) {
    //   setIntervalState(false)
    // } else {
    //   setIntervalState(true)
    // }
    // if (currentInterval && intervalState) {
    //   clearInterval(currentInterval)
    // } else {
    //   var slideShowTimer = setInterval(changeImg.bind(i), 3000);
    //   setCurrentInterval(slideShowTimer)
    // }
  };
  return (
    <>
      <ImageContainer search={searchTerm} />
      <PlaylistContainer />
      <div className="search" onDoubleClick={pause}>
        <form className="searchContainer" onSubmit={handleSearchSubmit}>
          <input placeholder="Search..." className="searchBar" value={currentSearchValue} onChange={handleSearchChange} />
          <FontAwesomeIcon className="searchIcon" icon={faSearch} />
        </form>
      </div>
      {loggedIn
        ? (
          <div className="iconCircle" onClick={handleLoginClick}>
            <FontAwesomeIcon className="loginButton" style={{ color: 'black' }} icon={faUser} />
          </div>
        )
        : (
        <div className="iconCircle" onClick={handleLoginClick}>
          <FontAwesomeIcon className="loginButton" style={{ color: 'black' }} icon={faUserSlash} />
        </div>
        )}
      <LoginModal />
      <MusicPlayer code={code} search={searchTerm} />
    </>
  );
};

export default Home;
