import { createSlice } from '@reduxjs/toolkit';

export const savedImagesSelectedSlice = createSlice({
  name: 'savedImagesSelected',
  initialState: {
    value: false,
  },
  reducers: {
    selectSavedImages: (state) => {
      state.value = true;
    },
    selectSearchedImages: (state) => {
      state.value = false;
    },
  },
});

export const { selectSavedImages, selectSearchedImages } = savedImagesSelectedSlice.actions;

export default savedImagesSelectedSlice.reducer;
