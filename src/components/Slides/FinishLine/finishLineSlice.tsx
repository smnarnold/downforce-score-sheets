import { createSlice } from '@reduxjs/toolkit';
import { IFinishLineItem } from './IFinishLine';

export const finishLineSlice = createSlice({
  name: 'finishLine',
  initialState: {
    arr: [null, null, null, null, null, null],
  },
  reducers: {
      updateFinishLine: (state: { arr: (string | null)[]; }, action: { payload: IFinishLineItem }) => {
          const tmp = [...state.arr];
          tmp[action.payload.index] = action.payload.car;
          state.arr = tmp;
      }
  },
})

export const { updateFinishLine } = finishLineSlice.actions;
export const finishLineArr = (state: { finishLine: { arr: (string|null)[] } } ):(string|null)[] => state.finishLine.arr;
export default finishLineSlice.reducer;