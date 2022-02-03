import React from 'react';
import config from '../../config';
import styles from './spotifyLogin.module.css';

const SpotifyLogin = () => {
  const { AUTH_URL } = config;
  return (
    <a className={styles.spotifyLoginButton} href={AUTH_URL}>
      Spotify Login
    </a>
  );
};

export default SpotifyLogin;
