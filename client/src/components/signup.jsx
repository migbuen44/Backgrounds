import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../slices/userLoginSlice';
import { setUserInfo } from '../slices/userInfoSlice';
import info from '../info';
import { closeModal } from '../slices/loginModalSlice';

const { url } = info;
const { localStorage } = window;

const SignUp = ({ setDisplaySignUp }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUpClick = (e) => {
    e.preventDefault();
    axios.post(`${url}/signup`, { name, password, email })
      .then((response) => {
        console.log(response.data);
        const { user, token } = response.data;
        localStorage.setItem('access_token', token);
        const localStorageTest = localStorage.getItem('access_token');
        console.log('localStorageTest: ', localStorageTest);
        dispatch(setUserInfo(user));
        dispatch(loginUser());
        dispatch(closeModal());
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
