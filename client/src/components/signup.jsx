import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import info from '../info';
import save from '../save';


const { url } = info;
const { localStorage } = window;

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUpClick = () => {
    axios.post(`${url}/signup`, { username, password, email })
      .then((response) => {
        console.log(response);
        const jwt = response.data;
        localStorage.setItem('jwt', jwt);
        const localStorageTest = localStorage.getItem('jwt');
        console.log('localStorageTest: ', localStorageTest);

        save(`${localStorageTest}fail`);
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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <div>SignUp Page</div>
      <form>
        <div>
          <label>Email: </label>
          <input type="email" className="email" onChange={handleEmailChange} />
        </div>
        <div>
          <label>Username: </label>
          <input type="text" className="username" onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" className="password" onChange={handlePasswordChange} />
        </div>
        <button type="button" className="signUp" onClick={handleSignUpClick}>SignUp</button>
        <button type="button" className="toLogin">
          <Link to="/login">Login</Link>
        </button>
      </form>
    </>
  );
};

export default SignUp;
