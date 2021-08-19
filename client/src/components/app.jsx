import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from './image.jsx';
import Login from './login.jsx';
import Sounds from './sounds.jsx';

const code = new URLSearchParams(window.location.search).get('code')

const App = () => {
  // let [value, setValue] = useState('chill');
  let [value, setValue] = useState('');
  let [search, setSearch] = useState('');
  let [backgrounds, setBackgrounds] = useState([]);
  let [currentInterval, setCurrentInterval] = useState();
  let [intervalState, setIntervalState] = useState(true);
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
  }

  let handleClick = () => {
    setSearch(value);
    axios.get(`https://api.pexels.com/v1/search?query=${value}+wallpaper`, pexelsAuth)
      .then(data => {
        let photos = data.data.photos
        setBackgrounds(photos);
      })
  }

  let style = {height: '70px', width: 'auto'};

  const changeImg = () => {
    if (!backgrounds.length) {
      return;
    }

    document.body.style.backgroundImage=`url(${backgrounds[i].src.landscape})`;
    if (i < backgrounds.length - 1) {
      i++
    } else {
      i = 0;
    }
  }

  useEffect(() => {
    changeImg();

    if (currentInterval) {
      clearInterval(currentInterval)
    }
    var slideShowTimer = setInterval(changeImg.bind(i), 3000);
    setCurrentInterval(slideShowTimer)
  }, [backgrounds]);

  if(!code) {
    return <div className='login'>
      <Login />
    </div>
  }

  const pause = () => {
    console.log(intervalState)
    // if (intervalState) {
    //   setIntervalState(false)
    // } else {
    //   setIntervalState(true)
    // }
    // if (currentInterval && intervalState) {
    //   clearInterval(currentInterval)
    // } else {
    //   var slideShowTimer = setInterval(changeImg.bind(i), 3000);
    //   setCurrentInterval(slideShowTimer)
    // }
  }

  return <>
    <div className='imageContainer'>
      {backgrounds.map((background, idx) => {
        return <Image key={idx} background={background} style={style}/>
      })}
    </div>
    <div className='search' onDoubleClick={pause}>
      <input placeholder="Search..." value={value} onChange={handleSearchChange}/>
      <button onClick={handleClick}>Search</button>
    </div>
    <Sounds code={code} search={search}/>
  </>
}

export default App;