import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { openModal } from '../../slices/loginModalSlice';

const LoginIcon = () => {
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    dispatch(openModal());
  };

  return (
    <div className="iconCircle loginContainer click" onClick={handleLoginClick}>
      <FontAwesomeIcon className="loginButton" style={{ color: 'black' }} icon={faUser} />
    </div>
  );
};

export default LoginIcon;
