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
  //   setSongIdx(5);
  //   setTrackUri(currentSong);
  // };

  if (!accessToken) {
    return <></>;
  }

  return (
    <div className='player'>
      <SpotifyPlayer
        token={accessToken}
        callback={(state) => { console.log(state); }}
        showSaveIcon
        autoPlay={true}
        play={true}
        uris={trackUri ? [trackUri] : []}
        offset={0}
      />
    </div>
  );
};

export default MusicPlayer;
