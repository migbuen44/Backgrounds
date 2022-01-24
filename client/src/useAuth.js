import { useState, useEffect } from 'react';
import axios from 'axios';
import config from './config';

const { url } = config;

const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState(null);
  // const [refreshToken, setRefreshToken] = useState();
  // const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios.post(`${url}/spotifyLogin`, {
      code,
    })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        // setRefreshToken(res.data.refreshToken);
        // setExpiresIn(res.data.expiresIn);
      })
      .catch((err) => {
        console.log(err);
        setAccessToken(null);
      });
  }, [code]);

  return accessToken;
};

export default useAuth;
