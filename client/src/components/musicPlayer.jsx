/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';

const MusicPlayer = ({ accessToken }) => {
  const currentSong = useSelector((state) => state.currentSong.value);
  const currentSongIdx = useSelector((state) => state.currentSongIdx.value);
  const [trackUri, setTrackUri] = useState();
  const [songIdx, setSongIdx] = useState(0);

  useEffect(() => {
    setTrackUri(currentSong);
  }, [currentSong]);

  // useEffect(() => {
  //   setSongIdx(currentSongIdx);
  // }, [currentSongIdx]);

  // const handleClick = () => {
  //   setSongIdx((prevState) => prevState + 1);
    // const temp = currentSong;
    // setTrackUri();
    // setTrackUri(currentSong);
  // };

  if (!accessToken) {
    return <></>;
  }

  return (
    <div className='player'>
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        autoPlay={true}
        play={true}
        uris={trackUri ? [trackUri] : []}
      />
    </div>
  );
};

export default MusicPlayer;
