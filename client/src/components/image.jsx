/* eslint-disable react/prop-types */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import save from '../save';
import { addToSavedImages } from '../slices/savedImagesSlice';

const Image = ({
  background,
  setImageClickedIdx,
  idx,
}) => {
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.userLogin.value);
  const savedImagesSelected = useSelector((state) => state.savedImagesSelected.value);
  const src = background;

  const handleImageClick = () => {
    setImageClickedIdx(idx);
  };

  const handleSaveClick = () => {
    save(src);
    dispatch(addToSavedImages(src));
  };

  return (
    <div className="singleImageContainer">
      <img src={src} className="singleImage click" onClick={handleImageClick}alt="" />
      {(userLoggedIn && !savedImagesSelected) ? (
        <div className="plusContainer click" onClick={handleSaveClick}>
          <FontAwesomeIcon icon={faPlus} className="plusIcon" style={{ color: 'black' }} />
        </div>
      ) : <></>}
    </div>
  );
};

export default Image;
