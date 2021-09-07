import { configureStore } from '@reduxjs/toolkit';
import userLoginReducer from './slices/userLoginSlice';
import loginModalReducer from './slices/loginModalSlice';
import userInfoReducer from './slices/userInfoSlice';
import playlistReducer from './slices/playlistSlice';

export default configureStore({
  reducer: {
    userLogin: userLoginReducer,
    loginModal: loginModalReducer,
    userInfo: userInfoReducer,
    playlist: playlistReducer,
  },
});
