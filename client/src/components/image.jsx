/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import save from '../save';

const Image = ({
  background,
  setImageClickedIdx,
  idx,
}) => {
  const userLoggedIn = useSelector((state) => state.userLogin.value);
  const src = background.src.landscape;

  const handleImageClick = () => {
    setImageClickedIdx(idx);
  };

  const handleSaveClick = () => {
    save(src);
  };

  return (
    <div className="singleImageContainer">
      <img src={src} className="singleImage" onClick={handleImageClick}alt="" />
      {userLoggedIn ? (
        <div className="plusContainer" onClick={handleSaveClick}>
          <FontAwesomeIcon icon={faPlus} className="plusIcon" style={{ color: 'black' }} />
        </div>
      ) : <></>}
    </div>
  );
};

export default Image;
