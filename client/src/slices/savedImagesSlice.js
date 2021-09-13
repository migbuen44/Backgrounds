import { createSlice } from '@reduxjs/toolkit';

export const savedImagesSlice = createSlice({
  name: 'savedImages',
  initialState: {
    value: [],
  },
  reducers: {
    updateSavedImages: (state, action) => {
      state.value = action.payload;
    },
    addToSavedImages: (state, action) => {
      state.value = [...state.value, action.payload];
    },
  },
});

export const { updateSavedImages, addToSavedImages } = savedImagesSlice.actions;

export default savedImagesSlice.reducer;
