import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../slices/userLoginSlice';
import { setUserInfo } from '../../slices/userInfoSlice';
import { updateSavedImages } from '../../slices/savedImagesSlice';
import config from '../../config';
import SignUp from './signup';
import { closeModal } from '../../slices/loginModalSlice';
import styles from './login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import logo from '../../img/logo_and_name.png';

const { url } = config;
const { localStorage } = window;

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);

  const getImages = (token) => {
    axios.get(`${url}/images/${token}`)
      .then((response) => {
        const savedImages = response.data.rows;
        const formattedSavedImages = savedImages.map((image) => image.url);
        dispatch(updateSavedImages(formattedSavedImages));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLoginClick = (e) => {
    setInvalidLogin(false);
    e.preventDefault();
    axios.post(`${url}/login`, { email, password })
      .then((response) => {
        const { user, token } = response.data;
        localStorage.setItem('access_token', token);
        dispatch(setUserInfo(user));
        dispatch(loginUser());
        getImages(token);
        dispatch(closeModal());
      })
      .catch((err) => {
        console.log('login error: ', err);
        setInvalidLogin(true);
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUpClick = () => {
    setDisplaySignUp(true);
  };

  if (displaySignUp) {
    return (
      <SignUp setDisplaySignUp={setDisplaySignUp} />
    );
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formSectionContainer}>
        {/* <img className={styles.logo} src={logo} alt="logo" /> */}
        <h2 className={styles.header}>Login</h2>
        {invalidLogin ? <div className={styles.invalidLogin}>Invalid username or password</div> : <></>}
        <form onSubmit={handleLoginClick} className={styles.userEntryForm}>
          <div className={styles.inputContainer}>
            <FontAwesomeIcon className={styles.emailIcon} icon={faEnvelope} />
            <input type="email" className={styles.email} placeHolder="Email" onChange={handleEmailChange} />
          </div>
          <div className={styles.inputContainer}>
            <FontAwesomeIcon className={styles.passwordIcon} icon={faLock}/>
            <input type="password" className={styles.password} placeHolder="Password" onChange={handlePasswordChange} />
          </div>
          <div className={styles.postMsgContainer}>
            <span className={styles.postMsg}>
              Don&#39;t have an account?&nbsp;
            </span>
            <span className={`${styles.createAccountBtn} click`} onClick={handleSignUpClick}>
              Create One
            </span>
          </div>
          <button type="submit" className={`${styles.submitLogin} click`} onClick={handleLoginClick}>Login</button>
          {/* <button type="button" className={styles.toSignUp} onClick={handleSignUpClick}>SignUp</button> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
