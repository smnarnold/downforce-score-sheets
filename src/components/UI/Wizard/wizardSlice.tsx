import { createSlice } from '@reduxjs/toolkit';

export const wizardSlice = createSlice({
    name: 'wizard',
    initialState: {
      index: 0,
    },
    reducers: {
      prevSlide: (state) => {
        state.index -= 1
      },
      nextSlide: (state) => {
        console.log('next')
        state.index += 1
      },
      goToSlide: (state, action) => {
        state.index = action.payload
      },
    },
  })
  
  export const { prevSlide, nextSlide, goToSlide } = wizardSlice.actions;
  export const wizardSlideIndex = (state: { wizard: { index: number; }; }) => state.wizard.index;
  export default wizardSlice.reducer;