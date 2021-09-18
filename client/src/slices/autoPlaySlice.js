import { createSlice } from '@reduxjs/toolkit';

export const autoPlaySlice = createSlice({
  name: 'autoPlay',
  initialState: {
    value: false,
  },
  reducers: {
    turnOnOnAutoPlay: (state) => {
      state.value = true;
    },
  },
});

export const { turnOnAutoPlay } = autoPlaySlice.actions;

export default autoPlaySlice.reducer;
