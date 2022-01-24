/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../slices/userLoginSlice';
import { setUserInfo } from '../../slices/userInfoSlice';
import config from '../../config';
import { closeModal } from '../../slices/loginModalSlice';
import styles from './login.module.css';

const { url } = config;
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
        const { user, token } = response.data;
        localStorage.setItem('access_token', token);
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
      <div className={styles.userInfo}>
        <h2 className={styles.header}>SignUp</h2>
        <form onSubmit={handleSignUpClick}>
          <div>
            <label>Email </label>
            <input type="email" className={styles.email} onChange={handleEmailChange} />
          </div>
          <div>
            <label>Name </label>
            <input type="text" className={styles.name} onChange={handleNameChange} />
          </div>
          <div>
            <label>Password </label>
            <input type="password" className={styles.password} onChange={handlePasswordChange} />
          </div>
          <button type="submit" className={styles.signUp} onClick={handleSignUpClick}>SignUp</button>
          <button type="button" className={styles.toLogin} onClick={handleLoginClick}>Login</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
