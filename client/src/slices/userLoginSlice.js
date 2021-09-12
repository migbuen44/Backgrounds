import { createSlice } from '@reduxjs/toolkit';

export const userLoginSlice = createSlice({
  name: 'userLoggedIn',
  initialState: {
    value: false,
  },
  reducers: {
    loginUser: (state) => {
      state.value = true;
    },
    logoutUser: (state) => {
      state.value = false;
    },
  },
});

export const { loginUser, logoutUser } = userLoginSlice.actions;

export default userLoginSlice.reducer;
