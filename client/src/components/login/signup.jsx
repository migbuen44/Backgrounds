/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../slices/userLoginSlice';
import { setUserInfo } from '../../slices/userInfoSlice';
import config from '../../config';
import { closeModal } from '../../slices/loginModalSlice';
import styles from './login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
    <div className={styles.signUpContainer}>
      <div className={styles.formSectionContainer}>
        <h2 className={styles.header}>SignUp</h2>
        <form onSubmit={handleSignUpClick} className={styles.userEntryForm}>
          <div className={styles.inputContainer}>
            <FontAwesomeIcon className={styles.emailIcon} icon={faEnvelope} />
            <input type="email" placeholder="Email" className={styles.email} onChange={handleEmailChange} />
          </div>
          <div className={styles.inputContainer}>
            <FontAwesomeIcon className={styles.nameIcon} icon={faUser}/>
            <input type="text" placeholder="Name" className={styles.name} onChange={handleNameChange} />
          </div>
          <div className={styles.inputContainer}>
            <FontAwesomeIcon className={styles.passwordIcon} icon={faLock}/>
            <input type="password" placeholder="Password" className={styles.password} onChange={handlePasswordChange} />
          </div>
          <button type="submit" className={`${styles.submitSignUp} click`} onClick={handleSignUpClick}>SignUp</button>
        </form>
      </div>
      <div className={`${styles.toLogin} click`}>
        <FontAwesomeIcon className={styles.backArrowIcon} icon={faArrowLeft}/>
        <span className={styles.backToLoginMsg} onClick={handleLoginClick}>Back to Login</span>
      </div>
    </div>
  );
};

export default SignUp;
