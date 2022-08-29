import { createSlice } from '@reduxjs/toolkit';
import { IBetItem } from './IBets';

export const betsSlice = createSlice({
  name: 'bets',
  initialState: {
    arr: [null, null, null],
  },
  reducers: {
      updateBets: (state: { arr: (string | null)[]; }, action: { payload: IBetItem }) => {
          const tmp = [...state.arr];
          tmp[action.payload.index] = action.payload.car;
          state.arr = tmp;
      }
  },
})

export const { updateBets } = betsSlice.actions;
export const betsArr = (state: { bets: { arr: (string | null)[] } } ) => state.bets.arr;
export default betsSlice.reducer;