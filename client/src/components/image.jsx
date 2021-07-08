import React, {useState, useEffect} from 'react';

let Image = ({ background, style }) => {

  // let [fullImageIsOpen, setFullImageIsOpen] = useState(false);
  let src = background.src.landscape;
  // console.log('src: ', src)

  return (
    <>
      <img style={style} src={src}></img>&nbsp;
    </>
  );
};

export default Image;