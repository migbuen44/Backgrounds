import { createSlice } from '@reduxjs/toolkit';

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    value: {
      id: null,
      name: null,
      email: null,
    },
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.value = action.payload;
    },
    setUserLogout: () => {
      state.value = {
        id: null,
        name: null,
        email: null,
      };
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
