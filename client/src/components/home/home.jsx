import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import { selectSavedImages, selectSearchedImages } from '../../slices/savedImagesSelectedSlice';
import MusicPlayer from '../musicPlayer/musicPlayer';
import LoginModal from '../login/loginModal';
import SongContainer from '../songs/songContainer';
import ImageContainer from '../images/imageContainer';
import Search from '../search/search';
import useAuth from '../../useAuth';
import SpotifyLoginButton from '../spotifyLogin/spotifyLogin';
import LoginIcon from '../icons_and_holders/loginIcon';
import LogoutIcon from '../icons_and_holders/logoutIcon';
import styles from './home.module.css';

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
          : <SpotifyLoginButton />
      }
      <Search setSearchTerm={setSearchTerm} />
      {loggedIn ? <LogoutIcon /> : <LoginIcon />}
      {savedImagesSelected ? (
          <div className={`${styles.saveSelectContainer} iconCircle click`} onClick={handleSearchedClicked}>
            <FontAwesomeIcon className={styles.savedButton} style={{ color: 'black' }} icon={faSearch} />
          </div>
        ) : (
          <div
            className={`${styles.saveSelectContainer} iconCircle click`}
            onMouseEnter={handleSavedMouseEnter}
            onMouseLeave={handleSavedMouseLeave}
            onClick={handleSavedClicked}>
            <FontAwesomeIcon className={styles.searchedButton} style={{ color: 'black' }} icon={faBookmark} />
            {displayLoginPrompt ? <span className={styles.loginPrompt}>Login to view saved backgrounds</span>
              : <></>}
          </div>
        )}
      <LoginModal />
      {
        accessToken ? <MusicPlayer accessToken={accessToken} />
          : (
            <div className={styles.musicPlayerHolder}>
              <div className={styles.playerHolderMessage}>Sign in to Spotify to play songs</div>
            </div>
          )
      }
    </>
  );
};

export default Home;
