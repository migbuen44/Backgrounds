import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserSlash, faBookmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import { openModal } from '../slices/loginModalSlice';
import { selectSavedImages, selectSearchedImages } from '../slices/savedImagesSelectedSlice';
import MusicPlayer from './musicPlayer';
import LoginModal from './loginModal';
import SongContainer from './songContainer';
import ImageContainer from './imageContainer';
import Search from './search';
import useAuth from '../useAuth';

const code = new URLSearchParams(window.location.search).get('code');

const Home = () => {
  const accessToken = useAuth(code);
  // const accessToken = null;
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.userLogin.value);
  const userSelectedSavedImages = useSelector((state) => state.savedImagesSelected.value);
  const [loggedIn, setLoggedIn] = useState(userLoggedIn);
  const [savedImagesSelected, setSavedImagesSelected] = useState(userSelectedSavedImages);
  const [searchTerm, setSearchTerm] = useState('');
  const [intervalState, setIntervalState] = useState(true);

  useEffect(() => {
    setLoggedIn(userLoggedIn);
  }, [userLoggedIn]);

  useEffect(() => {
    setSavedImagesSelected(userSelectedSavedImages);
  }, [userSelectedSavedImages]);

  const handleLoginClick = () => {
    dispatch(openModal());
  };

  const handleSavedClicked = () => {
    dispatch(selectSavedImages());
  }

  const handleSearchedClicked = () => {
    dispatch(selectSearchedImages());
  }

  return (
    <>
      <ImageContainer search={searchTerm} />
      <SongContainer search={searchTerm} accessToken={accessToken} />
      <Search setSearchTerm={setSearchTerm} />
      {loggedIn
        ? (
          <div className="iconCircle loginContainer" onClick={handleLoginClick}>
            <FontAwesomeIcon className="loginButton" style={{ color: 'black' }} icon={faUserSlash} />
          </div>
        )
        : (
        <div className="iconCircle loginContainer" onClick={handleLoginClick}>
          <FontAwesomeIcon className="loginButton" style={{ color: 'black' }} icon={faUser} />
        </div>
        )}
      {savedImagesSelected
        ? (
          <div className="iconCircle saveSelectContainer" onClick={handleSearchedClicked}>
            <FontAwesomeIcon className="savedButton" style={{ color: 'black' }} icon={faSearch} />
          </div>
        )
        : (
          <div className="iconCircle saveSelectContainer" onClick={handleSavedClicked}>
            <FontAwesomeIcon className="searchedButton" style={{ color: 'black' }} icon={faBookmark} />
          </div>
        )
      }
      <LoginModal />
      <MusicPlayer accessToken={accessToken} />
    </>
  );
};

export default Home;
