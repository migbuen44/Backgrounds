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
  marginBottom: '8px',
  alignSelf: 'center',
};

const ImageContainer = ({ search }) => {
  console.log('imagecontainer');
  console.log('search: ', search);
  const [backgrounds, setBackgrounds] = useState([]);
  const [currentInterval, setCurrentInterval] = useState();
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [imageClickedIdx, setImageClickedIdx] = useState(0);
  const [imagePaused, setImagePaused] = useState(false);

  let currentImage = 0;
  const { pexelsAuth } = info;

  const changeImg = (idx) => {
    document.body.style.backgroundImage = `url(${backgrounds[idx].src.landscape})`;
  };

  const cycleImg = () => {
    console.log('imageIdx: ', imageIdx);
    if (!backgrounds.length) {
      return;
    }

    changeImg(imageIdx);

    if (currentImage < backgrounds.length - 1) {
      currentImage += 1;
    } else {
      currentImage = 0;
    }
  };

  const playImages = () => {
    console.log('playImages()');
    if (currentInterval) {
      clearInterval(currentInterval);
    }
    const slideShowTimer = setInterval(
      cycleImg.bind(imageIdx, currentImageIdx, setCurrentImageIdx), 3000,
    );
    setCurrentInterval(slideShowTimer);
  };

  const toggle = () => {
    if (imagePaused) {
      imageIdx = currentImageIdx;
      playImages();
      setImagePaused(false);
    } else {
      pauseImages();
      setImagePaused(true);
    }
  };

  useEffect(() => {
    if (search === '' || search === undefined) return;

    axios.get(`https://api.pexels.com/v1/search?query=${search}+wallpaper&per_page=70`, pexelsAuth)
      .then((data) => {
        const { photos } = data.data;
        setBackgrounds(photos);
      });
  }, [search]);

  useEffect(() => {
    setCurrentImageIdx(0);
    cycleImg();
    playImages();
  }, [backgrounds]);

  useEffect(() => {
    if (!search) return;

    setCurrentImageIdx(imageClickedIdx);
    console.log('imageIdx before ChangeImg(): ', imageIdx);
    console.log('imageClickedIdx: ', imageClickedIdx);
    changeImg(imageClickedIdx);
    pauseImages();
    setImagePaused(true);
  }, [imageClickedIdx]);

  return (
    <>
      <div onClick={toggle} style={{position: 'absolute', left: '30vw'}}>Toggle</div>
      <div className="imageContainer">
        {backgrounds.map((background, idx) =>
          <Image key={idx} idx={idx} background={background} setImageClickedIdx={setImageClickedIdx} style={style} />)}
      </div>
    </>
  );
};

export default ImageContainer;
