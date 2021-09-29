// /* eslint-disable react/prop-types */
// import React, {useState, useEffect} from 'react';
// import { useDispatch } from 'react-redux';
// import { updateCurrentSong } from '../slices/currentSongSlice';
// import { updateCurrentSongIdx } from '../slices/currentSongIdxSlice';

// const albumImageStyle = {
//   height: '70px',
//   marginBottom: '7px',
// };

// const songTileStyle = {
//   position: 'relative',
//   right: '0.5vw',
//   float: 'right',
//   height: '60px',
//   display: 'block',
//   marginRight: '7px',
//   alignSelf: 'center',
// };

// const SongTile = ({ song, playlistIdx }) => {
//   const dispatch = useDispatch();
//   const albumImageUrl = song.track.album.images[1].url;
//   const { uri } = song.track;

//   // const onTileImageClick = () => {
//   //   dispatch(updateCurrentSongIdx(playlistIdx));
//   //   console.log(playlistIdx);
//   // };

//   const onTileImageClick = () => {
//     dispatch(updateCurrentSong(uri));
//   };

//   return (
//     <div style={albumImageStyle}>
//       <img style={songTileStyle} src={albumImageUrl} alt="" onClick={onTileImageClick} />
//     </div>
//   );
// };

// export default SongTile;

//****************** */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateCurrentSong } from '../slices/currentSongSlice';

// const songTileStyle = {
//   height: '70px',
//   marginBottom: '7px',
// };

// const albumImageStyle = {
//   position: 'relative',
//   right: '0.5vw',
//   float: 'right',
//   height: '60px',
//   display: 'block',
//   marginRight: '7px',
//   alignSelf: 'center',
// };

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