import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { logoutUser } from '../../slices/userLoginSlice';
import styles from './icons_and_holders.module.css';

const LogoutIcon = () => {
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={`${styles.loginContainer} iconCircle click`} onClick={handleLogoutClick}>
      <FontAwesomeIcon className={styles.loginButton} style={{ color: 'black' }} icon={faUserSlash} />
    </div>
  );
};
export default LogoutIcon;
