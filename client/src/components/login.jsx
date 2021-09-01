import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import info from '../info';
import save from '../save';

const { url } = info;
const { localStorage } = window;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    axios.post(`${url}/login`, { email, password })
      .then((response) => {
        console.log(response);
        const jwt = response.data.token;
        localStorage.setItem('jwt', jwt);
        const localStorageTest = localStorage.getItem('jwt');
        console.log('localStorageTest: ', localStorageTest);

        save(`${localStorageTest}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div>LoginPage</div>
      <form>
        <div>
          <label>Email: </label>
          <input type="email" className="email" onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" className="password" onChange={handlePasswordChange} />
        </div>
        <button type="button" className="submitLogin" onClick={handleLoginClick}>Login</button>
        <button type="button" className="toSignUp">
          <Link to="/signup">SignUp</Link>
        </button>
      </form>
    </>
  );
};

export default Login;
