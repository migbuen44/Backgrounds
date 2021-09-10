import { createSlice } from '@reduxjs/toolkit';

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    value: [],
  },
  reducers: {
    updatePlaylist: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updatePlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
