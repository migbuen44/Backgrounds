import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { openModal } from '../../slices/loginModalSlice';
import styles from './icons_and_holders.module.css';

const LoginIcon = () => {
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    dispatch(openModal());
  };

  return (
    <div className={`${styles.loginContainer} iconCircle click`} onClick={handleLoginClick}>
      <FontAwesomeIcon className={styles.loginButton} style={{ color: 'black' }} icon={faUser} />
    </div>
  );
};

export default LoginIcon;
