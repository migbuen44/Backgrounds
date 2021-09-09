import { createSlice } from '@reduxjs/toolkit';

export const currentSongIdxSlice = createSlice({
  name: 'currentSongIdx',
  initialState: {
    value: 0,
  },
  reducers: {
    updateCurrentSongIdx: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateCurrentSongIdx } = currentSongIdxSlice.actions;

export default currentSongIdxSlice.reducer;
