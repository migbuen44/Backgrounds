import React from 'react'
import axios from 'axios';

const Login = () => {
  const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=4cb458aef9d344d2a58c62e7da3d0da5&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
  return <a className='loginButton' href={AUTH_URL}>
    Spotify Login
  </a>
}

export default Login;
