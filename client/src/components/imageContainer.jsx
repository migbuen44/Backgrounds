/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import info from '../info';
import Image from './image';
import { updateSearchedImages } from '../slices/searchedImagesSlice';

const style = {
  position: 'relative',
  right: '0.5vw',
  height: '70px',
  display: 'block',
  marginBottom: '8px',
  alignSelf: 'center',
};

const ImageContainer = ({ search }) => {
  const dispatch = useDispatch();
  const savedImagesSelected = useSelector((state) => state.savedImagesSelected.value);
  const savedImages = useSelector((state) => state.savedImages.value);
  const searchedImages = useSelector((state) => state.searchedImages.value);
  const [backgrounds, setBackgrounds] = useState([]);
  const [currentInterval, setCurrentInterval] = useState();
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [imageClickedIdx, setImageClickedIdx] = useState(0);
  const [imagePaused, setImagePaused] = useState(false);

  useEffect(() => {
    if (savedImagesSelected) {
      setBackgrounds(savedImages);
    } else {
      setBackgrounds(searchedImages);
    }
  }, [savedImagesSelected]);

  let imageIdx = 0;
  const { pexelsAuth } = info;

  const changeImg = (idx) => {
    document.body.style.backgroundImage = `url(${backgrounds[idx]})`;
  };

  const cycleImg = () => {
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
        const formattedPhotos = photos.map((photo) => photo.src.landscape);
        setBackgrounds(formattedPhotos);
        dispatch(updateSearchedImages(formattedPhotos));
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
    changeImg(imageClickedIdx);
    pauseImages();
    setImagePaused(true);
  }, [imageClickedIdx]);

  return (
    <>
      <div onClick={toggle} className="toggle" />
      <div className="imageContainer">
        {backgrounds.map((background, idx) =>
          <Image key={idx} idx={idx} background={background} setImageClickedIdx={setImageClickedIdx} style={style} />)}
      </div>
    </>
  );
};

export default ImageContainer;
