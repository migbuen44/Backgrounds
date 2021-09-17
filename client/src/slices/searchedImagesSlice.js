import { createSlice } from '@reduxjs/toolkit';

export const searchedImagesSlice = createSlice({
  name: 'searchedImages',
  initialState: {
    value: [],
  },
  reducers: {
    updateSearchedImages: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateSearchedImages } = searchedImagesSlice.actions;

export default searchedImagesSlice.reducer;
