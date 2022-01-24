/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-node';
import config from '../../config';
import { updateCurrentSong } from '../../slices/currentSongSlice';
import SongTile from './songTile';
import styles from './songs.module.css';

const spotifyApi = new SpotifyWebApi({
  clientId: config.spotifyClientId,
});

const SongContainer = ({ accessToken, search }) => {
  const dispatch = useDispatch();
  const [currentPlaylist, setCurrentPlaylist] = useState([]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (search === '') {
      return;
    }
    spotifyApi.searchPlaylists(search, { limit: 1, offset: 1 })
      .then((res) => {
        const { uri } = res.body.playlists.items[0];
        const uriCode = uri.slice(17);

        spotifyApi.getPlaylist(uriCode)
          .then((res) => {
            const playlist = res.body.tracks.items;
            const firstSong = playlist[0].track.uri;
            dispatch(updateCurrentSong(firstSong));
            setCurrentPlaylist(playlist);
          });
      });
  }, [search]);

  return (
    <div className={`${styles.songContainer} scroll`}>
      {currentPlaylist.map((song, idx) =>
        <SongTile song={song} playlistIdx={idx} key={idx} />)}
    </div>
  );
};

export default SongContainer;
