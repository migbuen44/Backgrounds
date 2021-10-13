import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserSlash, faBookmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import { openModal } from '../slices/loginModalSlice';
import { selectSavedImages, selectSearchedImages } from '../slices/savedImagesSelectedSlice';
import MusicPlayer from './musicPlayer';
import LoginModal from './login/loginModal';
import SongContainer from './songs/songContainer';
import ImageContainer from './images/imageContainer';
import Search from './search';
import useAuth from '../useAuth';
import SpotifyLoginButton from './spotifyLogin';

const code = new URLSearchParams(window.location.search).get('code');

const Home = () => {
  const accessToken = useAuth(code);
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.userLogin.value);
  const userSelectedSavedImages = useSelector((state) => state.savedImagesSelected.value);
  const [loggedIn, setLoggedIn] = useState(userLoggedIn);
  const [savedImagesSelected, setSavedImagesSelected] = useState(userSelectedSavedImages);
  const [searchTerm, setSearchTerm] = useState('low fi');
  const [displayLoginPrompt, setDisplayLoginPrompt] = useState(false);

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
    if (!userLoggedIn) {
      return;
    }
    dispatch(selectSavedImages());
  };

  const handleSearchedClicked = () => {
    dispatch(selectSearchedImages());
  };

  const handleSavedMouseEnter = () => {
    if (!userLoggedIn) {
      setDisplayLoginPrompt(true);
    }
  };

  const handleSavedMouseLeave = () => {
    setDisplayLoginPrompt(false);
  };

  return (
    <>
      <ImageContainer search={searchTerm} />
      {
        accessToken ? <SongContainer search={searchTerm} accessToken={accessToken} />
          : (
            <SpotifyLoginButton />
          )
      }
      <Search setSearchTerm={setSearchTerm} />
      {loggedIn
        ? (
          <div className="iconCircle loginContainer click" onClick={handleLoginClick}>
            <FontAwesomeIcon className="loginButton" style={{ color: 'black' }} icon={faUserSlash} />
          </div>
        )
        : (
        <div className="iconCircle loginContainer click" onClick={handleLoginClick}>
          <FontAwesomeIcon className="loginButton" style={{ color: 'black' }} icon={faUser} />
        </div>
        )}
      {savedImagesSelected
        ? (
          <div className="iconCircle saveSelectContainer click" onClick={handleSearchedClicked}>
            <FontAwesomeIcon className="savedButton" style={{ color: 'black' }} icon={faSearch} />
          </div>
        )
        : (
          <div
            className="iconCircle saveSelectContainer click"
            onMouseEnter={handleSavedMouseEnter}
            onMouseLeave={handleSavedMouseLeave}
            onClick={handleSavedClicked}>
            <FontAwesomeIcon className="searchedButton" style={{ color: 'black' }} icon={faBookmark} />
            {displayLoginPrompt ? <span className="loginPrompt">Login to view saved backgrounds</span>
              : <></>}
          </div>
        )}
      <LoginModal />
      {
        accessToken ? <MusicPlayer className="musicPlayer" accessToken={accessToken} />
          : (
            <div className="musicPlayerHolder">
              <div className="playerHolderMessage">Sign in to Spotify to play songs</div>
            </div>
          )
      }
    </>
  );
};

export default Home;
