/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-node';
import SpotifyPlayer from 'react-spotify-web-playback';
import useAuth from '../useAuth';
import info from '../info';
import { updatePlaylist } from '../slices/playlistSlice';

const spotifyApi = new SpotifyWebApi({
  clientId: info.spotifyClientId,
});

const MusicPlayer = ({ code, search }) => {
  const dispatch = useDispatch();
  const accessToken = useAuth(code);
  const [trackUri, setTrackUri] = useState();

  useEffect(() => { // check if this use effect is even needed
    if (!accessToken) {
      return;
    }
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (search === '') {
      return;
    }
    spotifyApi.searchPlaylists(search, { limit: 1, offset: 1 }) // use async await here
      .then((res) => {
        console.log('res.body: ', res.body);
        const { uri } = res.body.playlists.items[0];
        console.log('uri: ', uri);
        setTrackUri(uri);

        const uriCode = uri.slice(17);
        console.log('uriCode: ', uriCode);

        spotifyApi.getPlaylist(uriCode)
          .then((res) => {
            console.log('getPlaylist res.body: ', res.body);
            const playlist = res.body.tracks.items;
            console.log('playlist: ', playlist);
            dispatch(updatePlaylist(playlist));
          });
      });
    // console.log(search)
  }, [search]);
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
