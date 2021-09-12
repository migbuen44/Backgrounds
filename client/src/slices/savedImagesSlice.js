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
  },
});

export const { updateSavedImages } = savedImagesSlice.actions;

export default savedImagesSlice.reducer;
