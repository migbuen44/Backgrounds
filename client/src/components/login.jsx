import React, { useState } from 'react';
import axios from 'axios';
import info from '../info';

const { url } = info;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    axios.post(`${url}/login`, { username, password })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div>LoginPage</div>
      <form>
        <div>
          <label>Username: </label>
          <input type="text" className="username" onChange={handleUsernameChange}/>
        </div>
        <div>
          <label>Password: </label>
          <input type="password" className="password" onChange={handlePasswordChange}/>
        </div>
        <button type="button" className="submitLogin" onClick={handleLoginClick}>Login</button>
      </form>
    </>
  );
};

export default Login;
