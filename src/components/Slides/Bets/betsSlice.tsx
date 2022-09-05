import { createSlice } from '@reduxjs/toolkit';
import { IBetItem } from './IBets';

const initialBets = [null, null, null];

export const betsSlice = createSlice({
  name: 'bets',
  initialState: initialBets as (null|string)[],
  reducers: {
      updateBets: (state, action: { payload: IBetItem }) => {
        const tmp = [...state];
        tmp[action.payload.index] = action.payload.car;
        return tmp;
      },
      resetBets: () => {
        return initialBets;
      }
  },
})

export const { updateBets, resetBets } = betsSlice.actions;
export const betsArr = (state: { bets: (string | null)[] } ) => state.bets;
export default betsSlice.reducer;