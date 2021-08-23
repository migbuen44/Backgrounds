/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import SpotifyPlayer from 'react-spotify-web-playback';
import useAuth from '../useAuth.js';
import info from '../info';

const spotifyApi = new SpotifyWebApi({
  clientId: info.spotifyClientId,
});

const Sounds = ({ code, search }) => {
  const accessToken = useAuth(code);
  const [trackUri, setTrackUri] = useState();

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
        setTrackUri(uri);
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

export default Sounds;
