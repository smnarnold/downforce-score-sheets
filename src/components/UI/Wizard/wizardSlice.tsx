import { createSlice } from '@reduxjs/toolkit';

export const wizardSlice = createSlice({
    name: 'wizard',
    initialState: 0,
    reducers: {
      prevSlide: (state) => state - 1,
      nextSlide: (state) => state + 1,
      goToSlide: (state, action: { payload: number; }) => action.payload,
    },
  })
  
  export const { prevSlide, nextSlide, goToSlide } = wizardSlice.actions;
  export const wizardSlideIndex = (state: { wizard: number }) => state.wizard;
  export default wizardSlice.reducer;