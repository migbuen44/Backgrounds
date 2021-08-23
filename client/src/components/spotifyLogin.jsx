import React from 'react';
import info from '../info';

const SpotifyLogin = () => {
  const { AUTH_URL } = info;
  return (
    <a className="spotifyLoginButton" href={AUTH_URL}>
      Spotify Login
    </a>
  );
};

export default SpotifyLogin;
