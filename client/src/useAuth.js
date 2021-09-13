import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = (code) => {
  console.log('useAuth called');
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios.post('http://localhost:4000/spotifyLogin', {
      code,
    })
      .then((res) => {
        console.log('access Token: ', res.data.accessToken);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
      })
      .catch((err) => {
        console.log(err);
        window.location = '/';
      });
  }, [code]);

  return accessToken;
};

export default useAuth;
