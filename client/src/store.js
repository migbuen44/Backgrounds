import { configureStore } from '@reduxjs/toolkit';
import userLoginReducer from './slices/userLoginSlice';

export default configureStore({
  reducer: {
    userLogin: userLoginReducer,
  },
});
