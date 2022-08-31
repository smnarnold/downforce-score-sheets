import { createSlice } from '@reduxjs/toolkit';
import { IBetItem } from './IBets';

export const betsSlice = createSlice({
  name: 'bets',
  initialState: [null, null, null] as (null|string)[],
  reducers: {
      updateBets: (state, action: { payload: IBetItem }) => {
        const tmp = [...state];
        tmp[action.payload.index] = action.payload.car;
        return tmp;
      }
  },
})

export const { updateBets } = betsSlice.actions;
export const betsArr = (state: { bets: (string | null)[] } ) => state.bets;
export default betsSlice.reducer;