/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';

const Image = ({
  background,
  style,
  setImageClickedIdx,
  idx,
}) => {
  // let [fullImageIsOpen, setFullImageIsOpen] = useState(false);
  const src = background.src.landscape;

  const handleImageClick = () => {
    setImageClickedIdx(idx);
  };

  return (
    <>
      <img style={style} src={src} onClick={handleImageClick}alt="" />
    </>
  );
};

export default Image;
