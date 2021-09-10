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
  console.log('imagecontainer');
  console.log('search: ', search);
  const [backgrounds, setBackgrounds] = useState([]);
  const [currentInterval, setCurrentInterval] = useState();
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [imagePaused, setImagePaused] = useState(false);

  let imageIdx = 0;
  console.log('currentImageIdx: ', currentImageIdx);
  const { pexelsAuth } = info;

  useEffect(() => {
    if (search === '' || search === undefined) return;

    axios.get(`https://api.pexels.com/v1/search?query=${search}+wallpaper&per_page=70`, pexelsAuth)
      .then((data) => {
        const { photos } = data.data;
        setBackgrounds(photos);
      });
  }, [search]);

  const changeImg = () => {
    console.log('imageIdx: ', imageIdx);
    if (!backgrounds.length) {
      return;
    }

    document.body.style.backgroundImage = `url(${backgrounds[imageIdx].src.landscape})`;

    if (imageIdx < backgrounds.length - 1) {
      imageIdx += 1;
      setCurrentImageIdx((prev) => prev + 1);
    } else {
      imageIdx = 0;
      setCurrentImageIdx(0);
    }
  };

  const playImages = () => {
    if (currentInterval) {
      clearInterval(currentInterval);
    }
    const slideShowTimer = setInterval(
      changeImg.bind(imageIdx, currentImageIdx, setCurrentImageIdx), 3000,
    );
    setCurrentInterval(slideShowTimer);
  };

  const pauseImages = () => {
    if (currentInterval) {
      clearInterval(currentInterval);
    }
  };

  useEffect(() => {
    setCurrentImageIdx(0);
    changeImg();

    playImages();
  }, [backgrounds]);

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

  return (
    <>
      <div onClick={toggle} style={{position: 'absolute', left: '30vw'}}>Toggle</div>
      <div className="imageContainer">
        {backgrounds.map((background, idx) =>
          <Image key={idx} background={background} style={style} />)}
      </div>
    </>
  );
};

export default ImageContainer;

// *******************

// /* eslint-disable react/prop-types */
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import info from '../info';
// import Image from './image';

// const style = {
//   position: 'relative',
//   right: '0.5vw',
//   height: '70px',
//   display: 'block',
//   marginBottom: '-7px',
//   alignSelf: 'center',
// };

// const ImageContainer = ({ search }) => {
//   console.log('imagecontainer');
//   console.log('search: ', search);
//   const [backgrounds, setBackgrounds] = useState([]);
//   const [currentInterval, setCurrentInterval] = useState();

//   let currentImageIdx = 0;
//   console.log('currentImageIdx: ', currentImageIdx);
//   const { pexelsAuth } = info;

//   useEffect(() => {
//     if (search === '' || search === undefined) return;

//     axios.get(`https://api.pexels.com/v1/search?query=${search}+wallpaper&per_page=70`, pexelsAuth)
//       .then((data) => {
//         const { photos } = data.data;
//         setBackgrounds(photos);
//       });
//   }, [search]);

//   const changeImg = () => {
//     if (!backgrounds.length) {
//       return;
//     }

//     document.body.style.backgroundImage = `url(${backgrounds[currentImageIdx].src.landscape})`;

//     if (currentImageIdx < backgrounds.length - 1) {
//       currentImageIdx += 1;
//     } else {
//       currentImageIdx = 0;
//     }
//   };

//   useEffect(() => {
//     changeImg();

//     if (currentInterval) {
//       clearInterval(currentInterval);
//     }
//     const slideShowTimer = setInterval(changeImg.bind(currentImageIdx), 3000);
//     setCurrentInterval(slideShowTimer);
//   }, [backgrounds]);

//   return (
//     <div className="imageContainer">
//       {backgrounds.map((background, idx) =>
//         <Image key={idx} background={background} style={style} />)}
//     </div>
//   );
// };

// export default ImageContainer;
