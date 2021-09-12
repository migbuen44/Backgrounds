import { createSlice } from '@reduxjs/toolkit';

export const imageDisplayModeSlice = createSlice({
  name: 'imageDisplayModeSlice',
  initialState: {
    value: 'searched',
  },
  reducers: {
    selectSavedImages: (state) => {
      state.value = 'saved';
    },
    selectSearchedImages: (state) => {
      state.value = 'searched';
    },
  },
});

export const { selectSavedImages, selectSearchedImages } = imageDisplayModeSlice.actions;

export default imageDisplayModeSlice.reducer;
