import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { openModal } from '../slices/loginModalSlice';
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
  const [loggedIn, setLoggedIn] = useState(userLoggedIn);
  const [searchTerm, setSearchTerm] = useState('');
  const [intervalState, setIntervalState] = useState(true);

  useEffect(() => {
    setLoggedIn(userLoggedIn);
  }, [userLoggedIn]);

  const handleLoginClick = () => {
    dispatch(openModal());
  };

  const toggleImagePlay = () => {
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
      <SongContainer search={searchTerm} accessToken={accessToken} />
      <Search setSearchTerm={setSearchTerm} />
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
      <MusicPlayer accessToken={accessToken} />
    </>
  );
};

export default Home;
