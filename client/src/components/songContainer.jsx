import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const SongContainer = () => {
  console.log('playlistContainer');
  const playlist = useSelector((state) => state.playlist.value);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);

  useEffect(() => {
    setCurrentPlaylist(playlist);
  }, [playlist]);

  return (
    <div className="songContainer">
      playlistContainer
    </div>
  );
};

export default SongContainer;
