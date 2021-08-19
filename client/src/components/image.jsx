/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';

const Image = ({ background, style }) => {
  // let [fullImageIsOpen, setFullImageIsOpen] = useState(false);
  const src = background.src.landscape;

  return (
    <>
      <img style={style} src={src} alt="" />
      &nbsp;
    </>
  );
};

export default Image;
