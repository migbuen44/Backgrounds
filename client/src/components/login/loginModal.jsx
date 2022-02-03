import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from './login';
import { closeModal } from '../../slices/loginModalSlice';
import styles from './login.module.css';

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000,
};

const MODAL_STYLES = {
  width: '50vh',
  height: '70vh',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '20px',
  zIndex: 1000,
};

const LoginModal = () => {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state) => state.loginModal.value);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(modalIsOpen);
  }, [modalIsOpen]);

  if (!isOpen) {
    return <></>;
  }

  const handleCloseClick = () => {
    dispatch(closeModal());
  };

  return ReactDom.createPortal(
    <div style={OVERLAY_STYLES}>
      <div className={styles.modal} style={MODAL_STYLES}>
        <span className={`${styles.closeModal} click`} style={{ float: 'right' }} onClick={handleCloseClick}>X</span>
        <Login />
      </div>
    </div>,
    document.getElementById('app'),
  );
};

export default LoginModal;
