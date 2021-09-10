/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { updateCurrentSong } from '../slices/currentSongSlice';

const SongTile = ({ song }) => {
  const dispatch = useDispatch();
  const albumImageUrl = song.track.album.images[1].url;
  const songName = song.track.name;
  const songAuthor = song.track.artists[0].name;
  const { uri } = song.track;

  const onTileImageClick = () => {
    dispatch(updateCurrentSong(uri));
  };

  return (
    <div className="songTile">
      <img className='albumImage' src={albumImageUrl} alt="" onClick={onTileImageClick} />
      <div className="songName">{songName}</div>
    </div>
  );
};

export default SongTile;
