import { createSlice } from '@reduxjs/toolkit';

export const currentSongSlice = createSlice({
  name: 'currentSong',
  initialState: {
    value: null,
  },
  reducers: {
    updateCurrentSong: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateCurrentSong } = currentSongSlice.actions;

export default currentSongSlice.reducer;
