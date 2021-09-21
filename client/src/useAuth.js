import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = (code) => {
  const [accessToken, setAccessToken] = useState(null);
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
        setAccessToken(null);
      });
  }, [code]);

  return accessToken;
};

export default useAuth;
