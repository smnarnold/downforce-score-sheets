import { createSlice } from '@reduxjs/toolkit';
import { IFinishLineItem } from './IFinishLine';

export const finishLineSlice = createSlice({
  name: 'finishLine',
  initialState: [null, null, null, null, null, null] as (null|string)[],
  reducers: {
    updateFinishLine: (state, action: { payload: IFinishLineItem }) => {
        const tmp = [...state];
        tmp[action.payload.index] = action.payload.car;
        return tmp;
    }
  },
})

export const { updateFinishLine } = finishLineSlice.actions;
export const finishLineArr = (state: { finishLine: (string|null)[] } ) => state.finishLine;
export default finishLineSlice.reducer;