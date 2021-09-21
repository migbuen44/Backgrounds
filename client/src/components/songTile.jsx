/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateCurrentSong } from '../slices/currentSongSlice';

const SongTile = ({ song }) => {
  const dispatch = useDispatch();
  const albumImageUrl = song.track.album.images[1].url;
  let songName = song.track.name;
  const songAuthor = song.track.artists[0].name;
  const { uri } = song.track;

  const onTileImageClick = () => {
    dispatch(updateCurrentSong(uri));
  };

  if (songName.length > 20) {
    songName = songName.substring(0, 20);
    songName = `${songName}...`;
  }

  return (
    <div className="songTile">
      <div className="songName">{songName}</div>
      <img className="albumImage click" src={albumImageUrl} alt="" onClick={onTileImageClick} />
    </div>
  );
};

export default SongTile;
