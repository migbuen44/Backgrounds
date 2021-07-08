import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from './image.jsx';

const App = () => {
  let [value, setValue] = useState('');
  let [backgrounds, setBackgrounds] = useState([]);
  let [currentInterval, setCurrentInterval] = useState();
  let i = 0;

  let pexelsAuth = {
    headers: {
      Authorization: '563492ad6f91700001000001833495325f904f5eb9301c9833e95697'
    }
  }

  let spotifyAuth = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer BQBw7oihJ9Wn1StG1WDcFrM0RskbwlfvaCEXmFhX8GuoLHHs1dc2vsW-HMNH3iO6u--Uj6dtdglQlksU-3F0RjKQawVR0tbbY8wYC4P5QpRnnYZ3VRxM21t76AD5GKZikn1TLjLeEtfurw'
  }
  }

  let handleSearchChange = (e) => {
    setValue(e.target.value);
    // console.log(value);
  }

  let handleClick = () => {
    axios.get(`https://api.pexels.com/v1/search?query=${value}`, pexelsAuth)
      .then(data => {
        let photos = data.data.photos
        // console.log(photos)
        setBackgrounds(photos);
      })

    // axios.get('https://api.spotify.com/v1/search?q=work&type=playlist&limit=2', spotifyAuth)
    //   .then(data => {
    //     console.log(data)
    //   })
  }

  let style = {height: '70px', width: 'auto'};

  const changeImg = () => {
    // console.log('changeImg')
    if (!backgrounds.length) {
      return;
    }
    // document.slide.src = backgrounds[i].src.landscape;
    // document.getElementById('app').style.backgroundImage=`url(${backgrounds[i].src.landscape})`
    document.body.style.backgroundImage=`url(${backgrounds[i].src.landscape})`;
    if (i < backgrounds.length - 1) {
      i++
    } else {
      i = 0;
    }
  }

  useEffect(() => {
    changeImg();
    // console.log(slideShowTimer)
    // window.clearInterval(6);
    if (currentInterval) {
      clearInterval(currentInterval)
    }
    var slideShowTimer = setInterval(changeImg.bind(i), 3000);
    setCurrentInterval(
      slideShowTimer
    )
    // clearInterval(slideShowTimer);
    // console.log(slideShowTimer)
  }, [backgrounds]);

  return <>
    <input placeholder="Search Mood Here..." value={value} onChange={handleSearchChange}/>
    <button onClick={handleClick}>Search</button>
    <h2>Backgrounds</h2>
    <div style={{width: '800px'}}>
      {backgrounds.map((background, idx) => {
        // console.log(background)
        return <Image key={idx} background={background} style={style}/>
      })}
    </div>
    <h2>Songs</h2>
  </>
}

export default App;