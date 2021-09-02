import { createSlice } from '@reduxjs/toolkit';

export const userLoginSlice = createSlice({
  name: 'userLoggedIn',
  initialState: {
    value: false,
  },
  reducers: {
    userLogin: (state) => {
      state.value = true;
    },
    userLogout: (state) => {
      state.value = false;
    },
  },
});

export const { userLogin, userLogout } = userLoginSlice.actions;

export default userLoginSlice.reducer;
