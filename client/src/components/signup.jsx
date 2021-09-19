import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import info from '../info';

const { url } = info;
const { localStorage } = window;

const SignUp = ({ setDisplaySignUp }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUpClick = (e) => {
    e.preventDefault();
    axios.post(`${url}/signup`, { name, password, email })
      .then((response) => {
        console.log(response);
        const jwt = response.data;
        localStorage.setItem('jwt', jwt);
        const localStorageTest = localStorage.getItem('jwt');
        console.log('localStorageTest: ', localStorageTest);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLoginClick = () => {
    setDisplaySignUp(false);
  };

  return (
    <>
      <div className="userInfo">
        <h2 className="header">SignUp</h2>
        <form onSubmit={handleSignUpClick}>
          <div>
            <label>Email </label>
            <input type="email" className="email" onChange={handleEmailChange} />
          </div>
          <div>
            <label>Name </label>
            <input type="text" className="name" onChange={handleNameChange} />
          </div>
          <div>
            <label>Password </label>
            <input type="password" className="password" onChange={handlePasswordChange} />
          </div>
          <button type="submit" className="signUp" onClick={handleSignUpClick}>SignUp</button>
          <button type="button" className="toLogin" onClick={handleLoginClick}>Login</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
