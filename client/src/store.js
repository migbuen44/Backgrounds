import { configureStore } from '@reduxjs/toolkit';
import userLoginReducer from './slices/userLoginSlice';
import loginModalReducer from './slices/loginModalSlice';
import userInfoReducer from './slices/userInfoSlice';
import playlistReducer from './slices/playlistSlice';
import currentSongReducer from './slices/currentSongSlice';
import currentSongIdxReducer from './slices/currentSongIdxSlice';

export default configureStore({
  reducer: {
    userLogin: userLoginReducer,
    loginModal: loginModalReducer,
    userInfo: userInfoReducer,
    playlist: playlistReducer,
    currentSong: currentSongReducer,
    currentSongIdx: currentSongIdxReducer,
  },
});
