/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';

const MusicPlayer = ({ accessToken }) => {
  const currentSong = useSelector((state) => state.currentSong.value);
  const currentSongIdx = useSelector((state) => state.currentSongIdx.value);
  const autoPlay = useSelector((state) => state.autoPlay.value);
  const [trackUri, setTrackUri] = useState();
  const [songIdx, setSongIdx] = useState(0);
  // const [autoPlay, setAutoPlay] = useState();

  useEffect(() => {
    setTrackUri(currentSong);
  }, [currentSong]);

  // useEffect(() => {
  //   setAutoPlay(autoPlayIsOn);
  // }, [autoPlayIsOn]);

  if (!accessToken) {
    return <></>;
  }

  return (
    <div className='player'>
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        autoPlay={autoPlay}
        play={autoPlay}
        uris={trackUri ? [trackUri] : []}
        callback={(state) => console.log(state)}
      />
    </div>
  );
};

export default MusicPlayer;
