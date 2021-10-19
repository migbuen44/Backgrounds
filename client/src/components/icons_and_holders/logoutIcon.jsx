import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { logoutUser } from '../../slices/userLoginSlice';

const LogoutIcon = () => {
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="iconCircle loginContainer click" onClick={handleLogoutClick}>
      <FontAwesomeIcon className="loginButton" style={{ color: 'black' }} icon={faUserSlash} />
    </div>
  );
};
export default LogoutIcon;
