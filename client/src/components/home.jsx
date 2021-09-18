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
import SpotifyLoginButton from './spotifyLogin';

const code = new URLSearchParams(window.location.search).get('code');

const Home = () => {
  const accessToken = useAuth(code);
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.userLogin.value);
  const userSelectedSavedImages = useSelector((state) => state.savedImagesSelected.value);
  const [loggedIn, setLoggedIn] = useState(userLoggedIn);
  const [savedImagesSelected, setSavedImagesSelected] = useState(userSelectedSavedImages);
  const [searchTerm, setSearchTerm] = useState('cool');

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
  };

  const handleSearchedClicked = () => {
    dispatch(selectSearchedImages());
  };

  // if (!accessToken) {
  //   return <></>;
  // }
  console.log('access Token before home return: ', accessToken);

  return (
    <>
      <ImageContainer search={searchTerm} />
      {
        accessToken ? <SongContainer search={searchTerm} accessToken={accessToken} />
          : (
            // <div className="songContainerHolder">
            //   <div className="containerHolderMessage">Sign in to Spotify to see songs</div>
            // </div>
            <SpotifyLoginButton />
          )
      }
      {/* <SongContainer search={searchTerm} accessToken={accessToken} /> */}
      <Search setSearchTerm={setSearchTerm} />
      {/* {
        accessToken ? <></>
          : <SpotifyLoginButton />
      } */}
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
