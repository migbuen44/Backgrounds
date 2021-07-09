import React, {useState, useEffect} from 'react';
import useAuth from '../useAuth.js';
import SpotifyWebApi from 'spotify-web-api-node';
import SpotifyPlayer from 'react-spotify-web-playback';

const spotifyApi = new SpotifyWebApi({
  clientId: '4cb458aef9d344d2a58c62e7da3d0da5'
})

const Sounds = ({ code, search}) => {
  const accessToken = useAuth(code)
  const [trackUri, setTrackUri] = useState();

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if(search === '') {
      return;
    }
    spotifyApi.searchPlaylists(search, {limit: 1, offset: 1})
      .then(res => {
        // console.log(res.body)
        let uri = res.body.playlists.items[0].uri;
        // console.log(uri)
        setTrackUri(uri);
      })
    // console.log(search)
  }, [search])
  if(!accessToken) {
    return <></>
  }

  return <div className='player'>
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      autoPlay={true}
      play={true}
      uris={trackUri ? [trackUri] : []}
    />
  </div>
}

export default Sounds;