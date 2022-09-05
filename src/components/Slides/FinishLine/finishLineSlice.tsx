import { createSlice } from '@reduxjs/toolkit';
import { IFinishLineItem } from './IFinishLine';

const initialFinishLine = [null, null, null, null, null, null];

export const finishLineSlice = createSlice({
  name: 'finishLine',
  initialState: initialFinishLine as (null|string)[],
  reducers: {
    updateFinishLine: (state, action: { payload: IFinishLineItem }) => {
        const tmp = [...state];
        tmp[action.payload.index] = action.payload.car;
        return tmp;
    },
    resetFinishLine: () => {
      return initialFinishLine;
    }
  },
})

export const { updateFinishLine, resetFinishLine } = finishLineSlice.actions;
export const finishLineArr = (state: { finishLine: (string|null)[] } ) => state.finishLine;
export default finishLineSlice.reducer;