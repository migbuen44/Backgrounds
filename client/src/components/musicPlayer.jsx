/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SpotifyPlayer from 'react-spotify-web-playback';

const MusicPlayer = ({ accessToken }) => {
  const currentSong = useSelector((state) => state.currentSong.value);
  const autoPlay = useSelector((state) => state.autoPlay.value);
  const [trackUri, setTrackUri] = useState();

  useEffect(() => {
    setTrackUri(currentSong);
  }, [currentSong]);

  if (!accessToken) {
    return <></>;
  }

  return (
    <div className='player'>
      <SpotifyPlayer
        token={accessToken}
        callback={(state) => { console.log(state); }}
        showSaveIcon
        autoPlay={autoPlay}
        play={autoPlay}
        uris={trackUri ? [trackUri] : []}
        offset={0}
      />
    </div>
  );
};

export default MusicPlayer;
