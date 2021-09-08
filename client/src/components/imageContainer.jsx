/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import info from '../info';
import Image from './image';

const style = {
  position: 'relative',
  right: '0.5vw',
  height: '70px',
  display: 'block',
  marginBottom: '-7px',
  alignSelf: 'center',
};

const ImageContainer = ({ search }) => {
  const [backgrounds, setBackgrounds] = useState([]);
  const [currentInterval, setCurrentInterval] = useState();

  let currentImage = 0;
  const { pexelsAuth } = info;

  useEffect(() => {
    if (search === '' || search === undefined) return;

    axios.get(`https://api.pexels.com/v1/search?query=${search}+wallpaper`, pexelsAuth)
      .then((data) => {
        const { photos } = data.data;
        setBackgrounds(photos);
      });
  }, [search]);

  const changeImg = () => {
    if (!backgrounds.length) {
      return;
    }

    document.body.style.backgroundImage = `url(${backgrounds[currentImage].src.landscape})`;

    if (currentImage < backgrounds.length - 1) {
      currentImage += 1;
    } else {
      currentImage = 0;
    }
  };

  useEffect(() => {
    changeImg();

    if (currentInterval) {
      clearInterval(currentInterval);
    }
    const slideShowTimer = setInterval(changeImg.bind(currentImage), 3000);
    setCurrentInterval(slideShowTimer);
  }, [backgrounds]);

  return (
    <div className="imageContainer">
      {backgrounds.map((background, idx) =>
        <Image key={idx} background={background} style={style} />)}
    </div>
  );
};

export default ImageContainer;
