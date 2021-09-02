import { configureStore } from '@reduxjs/toolkit';
import userLoginReducer from './slices/userLoginSlice';
import loginModalReducer from './slices/loginModalSlice';
import userInfoReducer from './slices/userInfoSlice';

export default configureStore({
  reducer: {
    userLogin: userLoginReducer,
    loginModal: loginModalReducer,
    userInfo: userInfoReducer,
  },
});
